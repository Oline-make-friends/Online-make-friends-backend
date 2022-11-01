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
      const posts = await Post.find({
        is_deleted: false,
      })
        .populate("created_by")
        .populate("comments");
      res.status(200).json(posts.reverse());
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //get post
  getPost: async (req, res) => {
    try {
      const posts = await Post.findById(req.params.id)
        .populate("created_by")
        .populate("likes")
        .populate("comments");
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  deletePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
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
      await post.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //Comment post
  commentPost: async (req, res) => {
    try {
      const post = await Post.findById(req.body.id);
      await post.updateOne({ $push: { comments: req.body.postid } });
      res.status(200).json("Updated successfully!");
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //get All post of a user
  getAllUserPost: async (req, res) => {
    try {
      const posts = await Post.find({
        created_by: req.params.id,
        is_deleted: false,
      }).populate("created_by");
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
        await Post.updateOne(
          { _id: req.body._id },
          { $pull: { likes: req.body.userId } }
        );
        res.status(200).json("Unliked!");
      } else {
        await Post.updateOne(
          { _id: req.body._id },
          { $push: { likes: req.body.userId } }
        );
        res.status(200).json("Liked!");
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //find post by hashtag
  findPostHashtag: async (req, res) => {
    try {
      const posts = await Post.find({
        content: { $regex: req.body.hashtag },
        is_deleted: false,
      }).populate("created_by");
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //upload post in group
  uploadPostInGroup: async (req, res) => {
    try {
      const newPost = new Post(req.body);
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};

module.exports = postController;

// function isEmpty(obj) {
//   for (var prop in obj) {
//     if (obj.hasOwnProperty(prop))
//       return false;
//   }
//   return JSON.stringify(obj) === JSON.stringify({});
// }
