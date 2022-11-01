const mongoose = require("mongoose");

const accountRequestModel = new mongoose.Schema(
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
    proof_image: {
      type: String,
      require: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const accountRequest = mongoose.model("Chat", accountRequestModel);

module.exports = { accountRequest };
