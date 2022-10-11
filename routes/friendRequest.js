const router = require("express").Router();
const friendRequestController = require("../controller/friendRequestController");

// router.get("/getFrRq", userController.getRequestFriendRequestModel);

router.delete("/deleteFrRq/:id", friendRequestController.deleteRequestFriend);

module.exports = router;
