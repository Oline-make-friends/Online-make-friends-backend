const router = require("express").Router();
const userController = require("../controller/userController");

router.post("/sendMail", userController.sendEmailResetPassword);


module.exports = router;
