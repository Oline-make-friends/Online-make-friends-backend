const { Comment } = require("../model/comment");

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
            const comment = await Comment.findById(req.body.id);
            await comment.updateOne({ $set: req.body });
            res.status(200).json("Updated successfully!");
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    //Delete comment
    deleteComment: async (req, res) => {
        try {
            await Comment.updateMany({ matches: req.body.id }, { matches: null });
            await Comment.findByIdAndDelete(req.body.id);
            res.status(200).json("Deleted successfully!");
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

};

module.exports = commentController;