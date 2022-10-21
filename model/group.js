const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
      },
    ],
    avatar_url: {
      type: String,
      default:
        "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt07d62336ee8ed926/6214ab2690aa357658b8e4cc/18-maguire.jpg",
    },
    name: {
      type: String,
    },
    content: {
      type: String,
      max: 500,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

let Group = mongoose.model("Group", groupSchema);

module.exports = { Group };
