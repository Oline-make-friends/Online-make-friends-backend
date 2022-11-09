const router = require("express").Router();
const quizController = require("../controller/quizController");

//Add quiz
router.post("/add", quizController.addQuizz);

//update quizz
router.post("/update/:id", quizController.updateQuiz);

//delete quizz
router.get("/delete/:id", quizController.deleteQuiz);

module.exports = router;
