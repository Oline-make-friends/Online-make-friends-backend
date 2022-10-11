const router = require("express").Router();
const userController = require("../controller/userController");

//get All Account
router.get("/getAllAccount", userController.getAllAccount);

//get All User
router.get("/getAllUser", userController.getAllUser);

//get user by email;
router.post("/getUserByEmail/:email", userController.getUserbyEmail);

router.post("/getUser/:id", userController.getUser);
router.post("/blockUser/:id", userController.blockUser);
//update User
router.post("/update/:id", userController.updateUserProfile);

//remove User interest
router.post("/removeInterest/:id", userController.removeUserInterest);

//add User interest
router.post("/addInterest/:id", userController.addUserInterest);

//add Friend
router.post("/addFriend", userController.addFriends);

//delete Friend
router.post("/deleteFriend", userController.deleteFriends);

//request Friend
router.post("/requestFriend", userController.requestFriend);

//follow user
router.post("/followUser", userController.followUser);
//unfollow user
router.post("/unfollow", userController.unFollowUser);

//getAllFriendRequest
router.post("/getFrRq", userController.getRequestFriendRequestModel);

module.exports = router;
