const { User } = require("../model/user");
const { FriendRequest } = require("../model/friendRequest");

const friendRequestController = {
  //delete friend request
  deleteRequestFriend: async (req, res) => {
    try {
      await FriendRequest.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully");
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //request add friend
  requestFriend: async (req, res) => {
    try {
      const friend = await User.findById(req.body.sender_id); //lấy User của người được gửi kết bạn
      const check = await FriendRequest.findOne({
        sender_id: req.body.sender_id,
        receiver_id: req.body.receiver_id,
      });

      if (friend.friends.includes(req.body.sender_id) || check !== null) {
        // await friend.updateOne({ $pull: { friends_request: req.body._id } });
        console.log("check");
        return res.status(200).json("You already request this friend!");
      }
      const newRqFr = new FriendRequest(req.body);
      newRqFr.save();
      // await friend.updateOne({ $push: { friends_request: req.body._id } }); //bỏ id của người gửi kb vào fr_req của người được gửi kết bạn
      res.status(200).json("Requested successfully!");
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //getFriendRequestModel
  getRequestFriendRequestModel: async (req, res) => {
    try {
      const reqFrs = await FriendRequest.find({
        receiver_id: req.body.receiver_id,
      }).populate("sender_id");
      res.status(200).json(reqFrs);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};

module.exports = friendRequestController;
