const db = require("../models");
const Category = db.category;
const Post = db.post;

const addCategories = async (req, res) => {
  let info = {
    name: req.body.name,
  };

  const category = await Category.create(info);
  res.status(200).send(category);
  console.log(category);
};

const getAllCategories = async (req, res) => {
  let category = await Category.findAll({
    include: [
      {
        model: Post,
        as: "post",
        attributes: ["id", "username", "image", "title", "description"],
      },
    ],
  });
  res.status(200).send(category);
};

const addPost = async (req, res) => {
  const { categoryId, postId } = req.body;
  return Category.findByPk(categoryId)
    .then((category) => {
      if (!category) {
        res.status(400).send({
          message: "Category can not be empty!",
        });
        return;
      }
      console.log("Category : ", category);
      return Post.findByPk(postId).then((post) => {
        if (!post) {
          res.status(400).send({
            message: "Post can not be empty!",
          });
          return;
        }

        category.addPost(post);
        res.send(category);
      });
    })
    .catch((err) => {
      console.log(">> Error while adding Post to Category: ", err);
    });
};

const updateCategory = async (req, res) => {
  let id = req.params.id;

  const category = await Category.update(req.body, { where: { id: id } });

  res.status(200).send(category);
};

const deleteCategory = async (req, res) => {
  let id = req.params.id;

  await Category.destroy({ where: { id: id } });

  res.status(200).send("Category is deleted !");
};

const getOneCategory = async (req, res) => {
  let id = req.params.id;
  let category = await Category.findByPk(id, {
    include: [
      {
        model: Post,
        as: "post",
        attributes: ["id", "username", "image", "title", "description"],
      },
    ],
  });
  res.status(200).send(category);
};

module.exports = {
  addCategories,
  getOneCategory,
  deleteCategory,
  updateCategory,
  getAllCategories,
  addPost,
};
