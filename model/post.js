const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      max: 500,
    },
    attachment_url: {
      type: String,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    is_deleted: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

let Post = mongoose.model("Post", postSchema);
module.exports = { Post };
