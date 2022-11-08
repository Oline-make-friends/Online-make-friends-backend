const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    question: {
      type: String,
    },
    options: [
      {
        type: String,
      },
    ],
    answer: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = { Quiz };
