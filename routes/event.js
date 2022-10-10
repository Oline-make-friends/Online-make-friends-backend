const router = require("express").Router();
const eventController = require("../controller/eventController");

//get All event
router.get("/getAll", eventController.getAllEvent);

//Add event
router.post("/add",eventController.createEvent);

//delete event
router.post("/delete",eventController.deleteEvent);

//update event
router.post("/update", eventController.updateEvent);

//get events user created
router.post("/getEventCreated", eventController.getAllUserEventCreated);

//get events user joined
router.post("/getEventJoined", eventController.getAllUserEventJoined);

module.exports = router;