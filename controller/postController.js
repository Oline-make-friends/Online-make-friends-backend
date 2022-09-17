const { Post } = require("../model/post");
const { User } = require("../model/user");

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
  // deletePost: async (req, res) => {
  //   try {
  //     await Post.updateMany({ matches: req.body.id }, { matches: null });
  //     await Post.findByIdAndDelete(req.body.id);
  //     res.status(200).json("Deleted successfully!");
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },

  //Delete post with is_deleted
  deletePost: async (req, res) => {
    try {
      await Post.updateMany({ matches: req.body.id }, { matches: null });
      const post = await Post.findById(req.body.id);
      await post.updateOne({ $set: { is_deleted: true } });
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Update post
  updatePost: async (req, res) => {
    try {
      const post = await Post.findById(req.body.id);
      console.log(req.body.id);
      await post.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (error) {
      res.status(500).json(error.message);
    }
  },


  //get All post of a user
  getAllUserPost: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      const posts = await Post.find({ created_by: user._id, is_deleted: false });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //add Like to post
  addLikePost: async (req, res) => {
    try {
      const post = await Post.findById({ _id: req.body._id });
      if (post.likes.includes(req.body.userId)) {
        await Post.updateOne({ _id: req.body._id }, { $pull: { likes: req.body.userId } });
        res.status(200).json("Unliked!");
      } else {
        await Post.updateOne({ _id: req.body._id }, { $push: { likes: req.body.userId } });
        res.status(200).json("Liked!");
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
};

module.exports = postController;
