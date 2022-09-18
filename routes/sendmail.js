const router = require("express").Router();
const userController = require("../controller/userController");

router.post("/sendEmailResetPassword/:id", userController.sendEmailResetPassword);


module.exports = router;
