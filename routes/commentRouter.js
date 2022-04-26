const comment = require("../controllers/commentController");

const router = require("express").Router();

router.get("/", comment.getAllComments);
router.post("/:id", comment.addComment);
// router.get("/:id", comment.getOneComment);
// router.put("/:id", comment.updateComment);
router.delete("/:id", comment.deleteComment);
module.exports = router;
