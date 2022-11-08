const router = require("express").Router();
const courseController = require("../controller/courseController");

router.get("/getAll", courseController.getAllCourse);

router.post("/add", courseController.createCourse);

router.get("/get/:id", courseController.getCourseById);

module.exports = router;
