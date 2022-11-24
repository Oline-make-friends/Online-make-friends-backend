const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
    location: {
      type: String,
      default: "",
    },
    interrests: [
      {
        type: String,
      },
    ],
    major: {
      type: String,
      default: "",
    },
    about: {
      type: String,
      default: "",
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    date_of_birth: {
      type: String,
    },
    friends_request: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    avatar_url: {
      type: String,
      default:
        "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt07d62336ee8ed926/6214ab2690aa357658b8e4cc/18-maguire.jpg",
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    is_prove: {
      type: Boolean,
      default: true,
    },
    proveImage_url: {
      type: String,
      default:
        "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt07d62336ee8ed926/6214ab2690aa357658b8e4cc/18-maguire.jpg",
    },
    follows: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

let User = mongoose.model("User", userSchema);

module.exports = { User };

// name,gender,age,location,about,matches(friens)
// [],image[],biography{},hash_password
