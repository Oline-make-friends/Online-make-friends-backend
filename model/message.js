const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    fromUser_id: { //id của người gửi
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    to_conversation_id: { // id của đoạn hồi thoại
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
    content: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = { Message };
