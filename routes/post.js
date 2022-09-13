const router = require("express").Router();
const postController = require("../controller/postController");

//get All Post
router.post("/getAll", postController.getAllPost);

//get All post user
router.post("/get",postController.getAllUserPost);

//create Post
router.post("/addPost", postController.createPost);

//delete Post
router.post("/deletePost", postController.deletePost);

module.exports = router;
