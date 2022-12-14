const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    image_url: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
    },
    location: {
      type: String,
      max: 500,
    },
    date_time: {
      type: String,
      max: 500,
    },
    user_joined: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

let Event = mongoose.model("Event", eventSchema);

module.exports = { Event };
