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

  //get course by id
  getUserCourse: async (req, res) => {
    try {
      const Courses = await Course.find({ created_by: req.params.id })
        .populate("created_by")
        .populate("quizs");
      res.status(200).json(Courses);
    } catch (error) {
      console.log(error.message);

      res.status(500).json(error.message);
    }
  },
  updateCourse: async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      await course.updateOne({ $set: req.body });
      res.status(200).json("update success");
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  deleteCourse: async (req, res) => {
    try {
      await Course.findByIdAndDelete(req.params.id);
      res.status(200).json("delete success");
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  },
};

module.exports = courseController;
