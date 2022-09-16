const { User } = require("../model/user");

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
  deleteUser: async (req, res) => {
    try {
      await User.updateMany({ matches: req.body.id }, { matches: null });
      await User.findByIdAndDelete(req.body.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Update USER Profile
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

  //get User By FullName
  getUserByFullName: async (req, res) => {
    try {
      const user = await User.findOne({ name: req.params.fullname });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
