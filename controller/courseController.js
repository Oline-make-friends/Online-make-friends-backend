const { Course } = require("../model/course");

const courseController = {
  createCourse: async (req, res) => {
    try {
      const newCourse = new Course(req.body);
      const savedCourse = await newCourse.save();
      res.status(200).json(savedCourse);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  },

  //get all course
  getAllCourse: async (req, res) => {
    try {
      const Courses = await Course.find()
        .populate("created_by")
        .populate("quizs");
      res.status(200).json(Courses);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  },
  //get course by id
  getCourseById: async (req, res) => {
    try {
      const Courses = await Course.findById(req.params.id)
        .populate("created_by")
        .populate("quizs");
      res.status(200).json(Courses);
    } catch (error) {
      console.log(error.message);

      res.status(500).json(error.message);
    }
  },
};

module.exports = courseController;
