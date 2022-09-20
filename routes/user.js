const router = require("express").Router();
const userController = require("../controller/userController");

router.get("/getAll", userController.getAllUser);

router.post("/getUserByFullName", userController.getUserByFullName);

router.post("/getUser/:id", userController.getUser);

router.post("/blockUser/:id", userController.blockUser);

module.exports = router;
