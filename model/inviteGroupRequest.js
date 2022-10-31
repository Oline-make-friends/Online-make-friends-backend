const mongoose = require("mongoose");

const inviteGroupRequest = new mongoose.Schema(
  {
    group_id: { // id của group
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
    sender_id: { // người mời 
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiver_id: { // người được mời vào group
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

let InviteGroupRequest = mongoose.model("InviteGroupRequest", inviteGroupRequest);

module.exports = { InviteGroupRequest };
