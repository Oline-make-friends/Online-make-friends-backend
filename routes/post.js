const router = require("express").Router();
const postController = require("../controller/postController");

//get All Post
router.get("/getAll", postController.getAllPost);

//get All post user
router.post("/get/:id", postController.getAllUserPost);

//get post
router.post("/getPost/:id", postController.getPost);

//create Post
router.post("/add", postController.createPost);

//delete Post
router.post("/delete/:id", postController.deletePost);

//update Post
router.post("/update", postController.updatePost);

//comment Post
router.post("/comment", postController.commentPost);

//like post
router.post("/like", postController.addLikePost);

//search hashtag
router.post("/searchTag", postController.findPostHashtag);

module.exports = router;
