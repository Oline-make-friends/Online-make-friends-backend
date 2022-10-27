const { Event } = require("../model/event");
const { User } = require("../model/user");

const eventController = {
  //get All event
  getAllEvent: async (req, res) => {
    try {
      const events = await Event.find()
        .populate("user_joined")
        .populate("created_by");
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //get event by id
  getEvent: async (req, res) => {
    try {
      const events = await Event.findById(req.params.id)
        .populate("user_joined")
        .populate("created_by");
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //Add event
  createEvent: async (req, res) => {
    try {
      const newEvent = new Event(req.body);
      const savedEvent = await newEvent.save();
      res.status(200).json(savedEvent);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //Update event
  updateEvent: async (req, res) => {
    try {
      const event = await Event.findById(req.body.id);
      await event.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //Delete event
  deleteEvent: async (req, res) => {
    try {
      await Event.updateMany({ matches: req.body.id });
      await Event.findByIdAndDelete(req.body.id);
      res.status(200).json("Deleted successfully!");
    } catch (error) {
      res.status(500).json(error.message);
    }
  },


  //Get all event user created
  getAllUserEventCreated: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      const events = await Event.find({ created_by: user._id });
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json(error.message);
      }
  },

    //Get all event user joined
    getAllUserEventJoined: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            const events = await Event.find({ user_joined: user._id });
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    //join Event
    joinEvent: async (req, res) => {
        try {
            const event = await Event.findById(req.body._id);
            const user = await User.findOne({ username: req.body.username });
            if (event.user_joined.includes(user._id)) {
                res.status(200).json("You already joined this event");
            } else {
                await event.updateOne({ $push: { user_joined: user._id } });
                res.status(200).json("Joined successfully");
            }
        } catch (error) {
            res.status(500).json(error.message);
        }

   

  //Get all event user joined
  getAllUserEventJoined: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      const events = await Event.find({ user_joined: user._id });
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};

module.exports = eventController;
