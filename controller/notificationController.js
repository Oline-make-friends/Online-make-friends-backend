const { Notification } = require("../model/notification");

const notificationController = {

    //get All notification
    getAllNotification: async (req, res) => {
        try {
            const notifications = await Notification.find().populate("user_id");
            if (notifications) {
                res.status(200).json(notifications);
            } else {
                res.status(200).json("No notification found!");
            }
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    //Add notification
    createNotification: async (req, res) => {
        try {
            const newNotification = new Notification(req.body);
            const savedNotification = await newNotification.save();
            res.status(200).json(savedNotification);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    //Update notification
    updateNotification: async (req, res) => {
        try {
            const notifications = await Notification.findById(req.body._id);
            await notifications.updateOne({ $set: req.body });
            res.status(200).json("Updated successfully!");
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    // Get notification from user
    getAllUserNotification: async (req, res) => {
        try {
            const notifications = await Notification.find({user_id: req.body.user_id});
            res.status(200).json(notifications);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}
module.exports = notificationController;