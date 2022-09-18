const { User } = require("../model/user");
const nodemailer = require("nodemailer");

const userController = {
  //Add user
  Register: async (req, res) => {
    try {
      const newUser = new User(req.body);
      const savedUser = await newUser.save();
      res.status(404).json(savedUser);
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
      });
      if (!user) {
        return res.status(500).json("Username or password is wrong!");
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //GET ALL USER
  getAllUser: async (req, res) => {
    try {
      const users = await User.find().populate("friends");
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

  //Add friends
  addFriends: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      const friend = await User.findById(req.body.friend);
      await user.updateOne({ $push: { matches: friend._id } });
      await friend.updateOne({ $push: { matches: user._id } });

      // console.log(friend);
      // console.log(req.body.friend);
      res.status(200).json(friend);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  getUserByFullName: async (req, res) => {
    try {
      const user = await User.find({
        fullname: { $regex: req.body.fullname },
      });
      // db.users.findOne({"username" : {$regex : "son"}});
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //get User by ID
  getUser: async (req, res) => {
    try {
      const user = await User.findOne({
        _id: req.params.id,
      });
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
      req.status(500).json(error.message);
    }
  },

  //send mail reset password

  sendEmailResetPassword: async (req, res) => {
    const { email } = req.body;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mklaaicogido123@gmail.com", // generated ethereal user
        pass: "pfdsjbptjmftnvte", // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    await transporter.sendMail(
      {
        from: "mklaaicogido123@gmail.com", // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
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
  }
  
}

module.exports = userController;
