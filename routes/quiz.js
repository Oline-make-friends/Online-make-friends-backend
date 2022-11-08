const router = require("express").Router();
const quizController = require("../controller/quizController");

//Add quiz
router.post("/add", quizController.addQuizz);

module.exports = router;
