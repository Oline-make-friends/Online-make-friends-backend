const { Quiz } = require("../model/quiz");
const { Course } = require("../model/course");

const quizController = {
  // add quiz to course
  addQuizz: async (req, res) => {
    try {
      const newQuiz = new Quiz(req.body);
      const savedQuiz = await newQuiz.save();
      const course = await Course.findById(req.body.courseId);
      await course.updateOne({ $push: { quizs: savedQuiz._id } });
      res.status(200).json(course);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  },
  updateQuiz: async (req, res) => {
    try {
      const quiz = await Quiz.findById(req.params.id);
      await quiz.updateOne({ $set: req.body });
      res.status(200).json("delete success");
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  deleteQuiz: async (req, res) => {
    try {
      await Quiz.findByIdAndDelete(req.params.id);
      res.status(200).json("delete success");
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};

module.exports = quizController;
