const router = require("express").Router();
const userController = require("../controller/userController");

router.post(
  "/sendEmailResetPassword/:username",
  userController.sendEmailResetPassword
);

module.exports = router;
