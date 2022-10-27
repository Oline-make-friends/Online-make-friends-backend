const { Chat } = require("../model/chat");

const chatController = {
  //get All chat
  getAllUserChat: async (req, res) => {
    try {
      const chats = await Chat.find();
      res.status(200).json(chats);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};
module.exports = chatController;
