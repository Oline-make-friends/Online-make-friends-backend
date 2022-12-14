const router = require("express").Router();
const commentController = require("../controller/commentController");

//get All comment
router.get("/getAll", commentController.getAllComment);

//Add comment
router.post("/add", commentController.createComment);

//Update comment
router.post("/update/:id", commentController.updateComment);

//delete comment
router.post("/delete", commentController.deleteComment);

//get comment from post
router.post("/get", commentController.getAllPostComment);

module.exports = router;
