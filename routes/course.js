const router = require("express").Router();
const courseController = require("../controller/courseController");

router.get("/getAll", courseController.getAllCourse);

router.post("/add", courseController.createCourse);

router.get("/get/:id", courseController.getCourseById);

router.get("/getUser/:id", courseController.getUserCourse);

router.post("/update/:id", courseController.updateCourse);

router.get("/delete/:id", courseController.deleteCourse);

module.exports = router;
