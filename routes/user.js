const router = require("express").Router();
const userController = require("../controller/userController");

//getAllUser
router.get("/getAll", userController.getAllUser);

//getUserByFullName
router.post("/getUserByFullName", userController.getUserByFullName);

//deleteUser
router.post("/deleteUser", userController.deleteUser);

//updateProfileUser
router.post("/updateUser", userController.updateUserProfile);

//registerUser
router.post("/addUser", userController.Register);

//loginUser
router.post("/loginUser", userController.Login);

module.exports = router;
