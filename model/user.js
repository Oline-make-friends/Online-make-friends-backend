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
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
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
        "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-Conversation-lam-hinh-dai-dien.jpg",
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
    is_active: {
      type: Boolean,
      default: true,
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
