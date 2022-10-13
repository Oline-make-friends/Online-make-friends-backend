const mongoose = require("mongoose");

const groupRequest = new mongoose.Schema(
  {
    user_id: { //user muốn vào group
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    group_id: { // group Id
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
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

let GroupRequest = mongoose.model("groupRequest", groupRequest);

module.exports = { GroupRequest };
