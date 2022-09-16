const router = require("express").Router();
const postController = require("../controller/postController");

//get All Post
router.get("/getAll", postController.getAllPost);

//get All post user
router.post("/get",postController.getAllUserPost);

//create Post
router.post("/add", postController.createPost);

//delete Post
router.post("/delete", postController.deletePost);

//update Post
router.post("/update", postController.updatePost);

//like post
router.post("/like", postController.addLikePost);
module.exports = router;
