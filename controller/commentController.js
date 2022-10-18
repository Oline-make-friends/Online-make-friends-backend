const { Comment } = require("../model/comment");
const { Post } = require("../model/post");

const commentController = {
  //get All comments
  getAllComment: async (req, res) => {
    try {
      const comments = await Comment.find();
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //Add comment
  createComment: async (req, res) => {
    try {
      const newComment = new Comment(req.body);
      const savedComment = await newComment.save();
      res.status(200).json(savedComment);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //Update comment
  updateComment: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      await comment.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //Delete comment
  deleteComment: async (req, res) => {
    try {
      const post = await Post.findById(req.body.postId);
      await post.updateOne({ $pull: { comments: req.body.commentId } });
      await Comment.findByIdAndDelete(req.body.commentId);
      res.status(200).json("Deleted successfully!");
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  },

  //Get comment from post
  getAllPostComment: async (req, res) => {
    try {
      const comments = await Comment.find({
        post_id: req.body.post_id,
        is_deleted: false,
      });
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};

module.exports = commentController;
