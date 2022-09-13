const { Post } = require("../model/post");
const { User } = require("../model/user");
const { post } = require("../routes/post");

const postController = {

  //Add post
  createPost: async (req, res) => {
    try {
      const newPost = new Post(req.body);
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //get All posts
  getAllPost: async (req, res) => {
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //Delete post
  deletePost: async (req, res) => {
    try {
      await Post.updateMany({ matches: req.body.id }, { matches: null });
      await Post.findByIdAndDelete(req.body.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Update post
  updatePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      await post.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //get All post of a user
  getAllUserPost: async (req, res) => {
    try {
      const user = await User.findOne({ name: req.params.username });
        const posts = await Post.find({ userId: user._id });
        res.status(200).json(posts);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
};

module.exports = postController;
