const post = require("../controllers/postController");

const router = require("express").Router();

router.post("/", post.upload, post.addPost);
router.get("/", post.getAllPosts);
router.get("/getPostComment/:id", post.getPostComment);
router.get("/:id", post.getOnePost);
router.put("/:id", post.updatePost);
router.delete("/:id", post.deletePost);

module.exports = router;
