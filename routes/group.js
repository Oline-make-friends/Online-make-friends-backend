const router = require("express").Router();
const groupController = require("../controller/groupController");

//get All group
router.get("/getAll", groupController.getAllGroups);

//Add group
router.post("/add",groupController.createGroup);

//add member to group
router.post("/addMember",groupController.addMemberToGroup);

//delete member from group
router.post("/deleteMember",groupController.deleteMemberInGroup);

//delete group
router.post("/delete", groupController.deleteGroup);

//get group user is admin
router.post("/getGroupAdmin", groupController.getAllGroupsAdmin);

//get group user is member
router.post("/getGroupMember", groupController.getAllGroupsMember);

//upload post to group
router.post("/upload", groupController.uploadPost);

//request join group
router.post("/requestJoinGroup", groupController.requestJoinGroup);

//get all request join group
router.post("/getAllRQJoinGr", groupController.getRequestJoinGroup);

//get list member from group
router.post("/getListMember", groupController.getListMember);

//get list admin from group
router.post("/getListAdmin", groupController.getListAdmin);

//set role admin for user
router.post("/setRoleAdmin", groupController.setRoleAdmin);

// //kick member
// router.post("/kickMember", groupController.kickMember);

//delete post
router.post("/deletePost", groupController.deletePost);

//invite user to join group
router.post("/inviteToJoinGroup", groupController.inviteToJoinGroup);

//get all invite request
router.post("/getAllInvite", groupController.getAllInvite);

module.exports = router;
