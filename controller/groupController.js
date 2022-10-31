const { Group } = require("../model/group");
const { User } = require("../model/user");
const { Post } = require("../model/post");
const postController = require("./postController");
const { GroupRequest } = require("../model/groupRequest");
const { InviteGroupRequest } = require("../model/inviteGroupRequest");
const { createPost } = require("./postController");

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

    //delete member in group (kick member)
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
    },

    //get List member from group by group id
    getListMember: async (req, res) => {
        try {
            const group = await Group.findById(req.body._id);
            res.status(200).json(group.members);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    //get List admin from group by group id
    getListAdmin: async (req, res) => {
        try {
            const group = await Group.findById(req.body._id);
            res.status(200).json(group.admins);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    //set role admin for user
    setRoleAdmin: async (req, res) => {
        try {
            const group = await Group.findById(req.body._id);
            if (group.admins.includes(req.body.idUser)) {
                res.status(200).json("This user is already admin of the group!");
            } else {
                await group.updateOne({ $push: { admins: req.body.idUser } });
                res.status(200).json("Added successfully!");
            }
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    // //update member
    // updateMember: async (req, res) => {
    //     try {
    //         const member = await Group.findOne({members: req.params.id});
    //         await member.updateOne({ $set: req.body});
    //         res.status(200).json("Updated Successfully");
    //     } catch (error) {
    //         res.status(200).json(error.message);
    //     }
    // },

    //delete post
    deletePost: async (req, res) => {
        try {
            const group = await Group.findById(req.body._id);
            if (group.posts.includes(req.body.idPost)) {
                await group.updateOne({ $pull: { posts: req.body.idPost } });
                await Post.updateOne({ _id: req.body.idPost }, { $set: { is_deleted: true } })
                res.status(200).json("Deleted Successfully");
            } else {
                res.status(200).json("This post is not existed in group");
            }
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    // //kick member
    // kickMember: async (req, res) => {
    //     try {
    //         const group = await Group.findById(req.body._id);
    //         if (group.members.includes(req.body.userId)) {
    //             await group.updateOne({ $pull: { members: req.body.userId } });
    //             res.status(200).json("Kicked Successfully");
    //         } else {
    //             res.status(200).json("This user is not a member of group");
    //         }
    //     } catch (error) {
    //         res.status(500).json(error.message);
    //     }
    // },

    //invite user to join Group
    inviteToJoinGroup: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username }); //lấy User của người mình muốn invite vào group
            const group = await Group.findById(req.body._id); // lấy Group
            const check = await GroupRequest.find({ // check nếu như user này đã được invite rồi
                user_id: user._id,
                group_id: group._id,
            });
            if (group.members.includes(user._id)){
                res.status(200).json("This user is already in group");
            } else if (check.length > 0) {
                res.status(200).json("This user is already invited");
            }else{
                const newInvGr = new InviteGroupRequest({
                    group_id: group._id,
                    user_id: user._id,
                });
                newInvGr.save();
                res.status(200).json("Invited successfully!");
            }
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    //get all invite request
    getAllInvite: async(req, res) => {
        try {
            const InvRqGr = await InviteGroupRequest.find();
            res.status(200).json(InvRqGr);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

}

module.exports = groupController;