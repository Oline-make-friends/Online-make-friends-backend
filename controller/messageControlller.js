const { Message } = require("../model/message");

const messageController = {

    //get All messages
    getAllMessage: async (req, res) => {
        try {
            const messages = await Message.find();
            if (messages) {
                res.status(200).json(messages);
            } else {
                res.status(200).json("No message found!");
            }
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    //Add message
    createMessage: async (req, res) => {
        try {
            const newMessage = new Message(req.body);
            const savedMessage = await newMessage.save();
            res.status(200).json(savedMessage);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    // Get message from user in 1 conservation
    getAllUserMessage: async (req, res) => {
        try {
            const messages = await Message.find(
                { fromUser_id: req.body.fromUser_id, to_conversation_id: req.body.to_conversation_id }
            );
            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}
module.exports = messageController;