const router = require("express").Router();
const messageController = require("../controller/messageControlller");

//get All message
router.get("/getAll", messageController.getAllMessage);

//Add message
router.post("/add", messageController.createMessage);

//get message from user
router.post("/get", messageController.getAllUserMessage);

module.exports = router;
