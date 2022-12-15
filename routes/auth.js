const router = require("express").Router();
const userController = require("../controller/userController");

router.post("/register", userController.Register);

router.post("/login", userController.Login);

router.post("/loginAdmin", userController.LoginAdmin);

router.post("/loginByGmail/:email", userController.LoginByGmail);

router.post("/inviteAdmin/:email", userController.sendEmailToBecomeAdmin);

router.post("/proveAccount/:email", userController.sendEmailProve);

module.exports = router;
