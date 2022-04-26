const category = require("../controllers/categoryController");

const router = require("express").Router();

router.post("/", category.addCategories);
router.get("/", category.getAllCategories);
router.get("/:id", category.getOneCategory);
router.post("/Post", category.addPost);
router.put("/:id", category.updateCategory);
router.delete("/:id", category.deleteCategory);

module.exports = router;
