const mongoose = require("mongoose");

const friendRequest = new mongoose.Schema(
  {
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiver_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

let FriendRequest = mongoose.model("FriendRequest", friendRequest);

module.exports = { FriendRequest };
