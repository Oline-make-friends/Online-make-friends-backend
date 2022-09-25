const router = require("express").Router();
const userController = require("../controller/userController");

//get All User
router.get("/getAll", userController.getAllUser);

//get All User by Fullname
router.post("/getUserByFullName", userController.getUserByFullName);


router.post("/getUser/:id", userController.getUser);
router.post("/blockUser/:id", userController.blockUser);
//update User
router.post("/update", userController.updateUserProfile);
//delete User
router.post("/delete", userController.deleteUser)
//add Friend
router.post("/addFriend", userController.addFriends);
//delete Friend
router.post("/deleteFriend", userController.deleteFriends);


module.exports = router;
