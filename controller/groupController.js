const { Group } = require("../model/group");
const { User } = require("../model/user");
const { Post } = require("../model/post");
const postController = require("./postController");
const { GroupRequest } = require("../model/groupRequest");

const groupController = {

    //Add group
    createGroup: async (req, res) => {
        try {
            const newGroup = new Group(req.body);
            const saveGroup = await newGroup.save();
            res.status(200).json(saveGroup);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    //get All groups
    getAllGroups: async (req, res) => {
        try {
            const groups = await Group.find();
            res.status(200).json(groups);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    //delete group
    deleteGroup: async (req, res) => {
        try {
            await Group.updateMany({ matches: req.body.id }, { matches: null });
            const group = await Group.findById(req.body.id);
            await Group.updateOne({ $set: { is_deleted: true } });
            res.status(200).json("Deleted successfully!");
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    //delete member in group
    deleteMemberInGroup: async (req, res) => {
        try {
            await Group.updateMany({ matches: req.body.memberId }, { matches: null });
            await Group.updateOne({ _id: req.body._id }, { $pull: { members: req.body.memberId } });
            res.status(200).json("Deleted successfully!")
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    //add member in group
    addMemberToGroup: async (req, res) => {
        try {
            await Group.updateMany({ matches: req.body.memberId }, { matches: null });
            await Group.updateOne({ _id: req.body._id }, { $push: { members: req.body.memberId } });
            res.status(200).json("Added successfully!")
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    //get All group that user is admin
    getAllGroupsAdmin: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            const groups = await Group.find({ admin: user._id, is_deleted: false });
            res.status(200).json(groups);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    //get all group that user is member
    getAllGroupsMember: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            const groups = await Group.find({ members: user._id, is_deleted: false });
            res.status(200).json(groups);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    //upload post to group
    uploadPost: async (req, res) => {
        try {
            const newPost = new Post(req.body);
            const savedPost = await newPost.save();
            await Group.updateOne({ _id: req.body._idGroup }, { $push: { posts: savedPost } });
            res.status(200).json("Uploaded successfully!")
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    //request join group
    requestJoinGroup: async (req, res) => {
        try {
            const group = await Group.findOne({ username: req.body.groupName }); //lấy Group được gửi rq join
            if (group.members.includes(req.body._id)) {
                res.status(200).json("You already join this group!");
            } else {
                const newRqGr = new GroupRequest({
                    user_id: req.body._id,
                    group_id: group._id,
                });
                newRqGr.save();
                await group.updateOne({ $push: { groups_request: req.body._id } }); //bỏ id của user request join vào groups_rq
                res.status(200).json("Requested successfully!");
            }
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    //getrequestJoinGroup để test coi có tạo chưa
    getRequestJoinGroup: async (req, res) => {
        try {
            const rqGr = await GroupRequest.find();
            res.status(200).json(rqGr);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

}

module.exports = groupController;