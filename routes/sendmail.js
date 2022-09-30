const router = require("express").Router();
const userController = require("../controller/userController");

router.post(
  "/sendEmailResetPassword/:username",
  userController.sendEmailResetPassword
);

router.post("/sendEmailContact/", userController.sendEmailContact);

module.exports = router;
