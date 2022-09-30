const router = require("express").Router();
const notificationController = require("../controller/notificationController");

//get All notification
router.get("/getAll", notificationController.getAllNotification);

//Add notification
router.post("/add", notificationController.createNotification);

//Update notification
router.post("/update/:id", notificationController.updateNotification);

//Delete notification
router.post("/delete/:id", notificationController.deleteNotification);

//get notification from user
router.post("/get", notificationController.getAllUserNotification);

module.exports = router;
