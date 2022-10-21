const { User } = require("../model/user");
const nodemailer = require("nodemailer");
const { FriendRequest } = require("../model/friendRequest");
const { json } = require("express");

const userController = {
  //Register user
  Register: async (req, res) => {
    try {
      const newUser = new User(req.body);
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //Login
  Login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({
        user_name: username,
        password: password,
      })
        .populate("friends")
        .populate("follows");
      if (!user) {
        return res.status(500).json("Username or password is wrong!");
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //Login by email
  LoginByGmail: async (req, res) => {
    try {
      const user = await User.findOne({
        username: req.params.email,
      })
        .populate("friends")
        .populate("follows");
      if (!user) {
        return res.status(500).json("Can not find account, please sign up");
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //GET ALL Account
  getAllAccount: async (req, res) => {
    try {
      const users = await User.find().populate("friends");
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //GET ALL User
  getAllUser: async (req, res) => {
    try {
      const users = await User.find({ is_admin: false })
        .populate("friends")
        .populate("follows");
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //DELETE USER
  // deleteUser: async (req, res) => {
  //   try {
  //     await User.updateMany({ matches: req.body.id }, { matches: null });
  //     await User.findByIdAndDelete(req.body.id);
  //     res.status(200).json("Deleted successfully!");
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },

  //Update USER
  updateUserProfile: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      await user.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //Remove interest USER
  removeUserInterest: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      await user.updateOne({ $pull: { interrests: req.body.interest } });
      res.status(200).json("Updated successfully!");
    } catch (error) {
      res.status(500).json(error.message);
      console.log(error.message);
    }
  },

  //add interest USER
  addUserInterest: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      await user.updateOne({ $push: { interrests: req.body.interest } });
      res.status(200).json("Updated successfully!");
    } catch (error) {
      res.status(500).json(error.message);
      console.log(error.message);
    }
  },

  //Add friend
  addFriends: async (req, res) => {
    try {
      const user = await User.findById(req.body.sender_id);

      const friend = await User.findById(req.body.receiver_id);
      await user.updateOne({ $push: { friends: friend._id } });
      await friend.updateOne({ $push: { friends: user._id } });
      res.status(200).json("Add friend Success!");
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //Delete friend
  deleteFriends: async (req, res) => {
    try {
      const user = await User.findById(req.body.sender_id);

      const friend = await User.findById(req.body.receiver_id);
      await user.updateOne({ $pull: { friends: friend._id } });
      await friend.updateOne({ $pull: { friends: user._id } });
      res.status(200).json("Delete friend Success!");
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //get User by username
  getUserbyEmail: async (req, res) => {
    try {
      const user = await User.find({
        username: req.params.email,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //get user by id

  getUser: async (req, res) => {
    try {
      const user = await User.findOne({
        _id: req.params.id,
      })
        .populate("friends")
        .populate("follows");
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //block user by id
  blockUser: async (req, res) => {
    try {
      const user = await User.findOne({
        _id: req.params.id,
      });
      {
        user.is_active === true
          ? await user.updateOne({ is_active: false })
          : await user.updateOne({ is_active: true });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //send mail reset password

  sendEmailResetPassword: async (req, res) => {
    try {
      const email = req.params.username;
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "onlinemakefriends@gmail.com", // generated ethereal user
          pass: "ckapnweiblqmuygr", // generated ethereal password
          // clientId: GOOGLE_MAILER_CLIENT_ID,
          // clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
        },
      });
      const random = Math.random().toString(36).substring(1, 30);

      const user = await User.findOne({
        username: req.params.username,
      });
      if (user == null) {
        return res.status(500).json("can not find user");
      }

      // await user.updateOne({ password: result });

      // send mail with defined transport object
      await transporter.sendMail({
        from: "onlinemakefriends@gmail.com", // sender address
        to: email, // list of receivers
        subject: "Reset Password", // Subject line
        text: "Hello world?", // plain text body
        html: `<b>Hi ${user.fullname} </b>\n
        <p>We heard that you lost your password. 

        But don’t worry! You can use the following link to reset your password: </p>\n
        <a href="http://localhost:3000/LinkResetPS/${user._id}/${random}">Reset password</a>\n
        <p>Thanks,</p>
        
        `, // html body
      });
      res.status(200).json("Success");
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  },

  //send mail contact

  sendEmailContact: async (req, res) => {
    try {
      const name = req.body.firstName + req.body.lastName;
      const email = req.body.email;
      const message = req.body.message;
      const phone = req.body.phone;
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "onlinemakefriends@gmail.com", // generated ethereal user
          pass: "ckapnweiblqmuygr", // generated ethereal password
          // clientId: GOOGLE_MAILER_CLIENT_ID,
          // clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
        },
      });
      // send mail with defined transport object
      await transporter.sendMail(
        {
          from: name,
          to: "********@gmail.com",
          subject: "Contact Online makes friend",
          html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>Message: ${message}</p>`,
        },
        (err) => {
          if (err) {
            return res.json({
              message: "Lỗi",
              err,
            });
          }
          return res.json({
            message: `Đã gửi mail thành công cho tài khoản ${email}`,
          });
        }
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //request add friend
  requestFriend: async (req, res) => {
    try {
      const friend = await User.findById(req.body.sender_id); //lấy User của người được gửi kết bạn

      const check = await FriendRequest.find({
        sender_id: req.body.sender_id,
        receiver_id: req.body.receiver_id,
      });
      console.log(friend.friends.includes(req.body.sender_id));
      if (check.length > 0) {
        // await friend.updateOne({ $pull: { friends_request: req.body._id } });
        return res.status(200).json("You already request this friend!");
      } else if (friend.friends.includes(req.body.sender_id)) {
        return res.status(200).json("You already request this friend!");
      } else {
        const newRqFr = new FriendRequest(req.body);
        const saveRqFr = await newRqFr.save();
        // await friend.updateOne({ $push: { friends_request: req.body._id } }); //bỏ id của người gửi kb vào fr_req của người được gửi kết bạn
        return res.status(200).json(saveRqFr);
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  // follow user
  followUser: async (req, res) => {
    try {
      const user = await User.findById(req.body.currentUser_id);
      if (user.follows.includes(req.body.follower_id)) {
        res.status(200).json("You already follow this user!");
      } else {
        await user.updateOne({ $push: { follows: req.body.follower_id } });
        res.status(200).json("Followed successfully!");
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  // // unfollow user
  // unFollowUser: async (req, res) => {
  //   try {
  //     const user = await User.findById(req.body.currentUser_id);
  //     console.log(user);
  //     await user.updateOne({ $pull: { follows: req.body.id } });
  //     res.status(200).json("Unfollow successfully!");
  //   } catch (error) {
  //     res.status(500).json(error.message);
  //   }
  // },

  // unfollow user
  unFollowUser: async (req, res) => {
    try {
      const user = await User.findById(req.body.currentUser_id);

      // const follower = await User.findById(req.body.id);
      await user.updateOne({ $pull: { follows: req.body.follower_id } });
      res.status(200).json("Unfollow Success!");
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //getFriendRequestModel
  getRequestFriendRequestModel: async (req, res) => {
    try {
      const reqFrs = await FriendRequest.find({
        receiver_id: req.body.receiver_id,
      }).populate("sender_id");
      res.status(200).json(reqFrs);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};

module.exports = userController;
