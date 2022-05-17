const db = require("../models");
const multer = require("multer");
const path = require("path");
const Post = db.post;
const Comment = db.comment;
const Category = db.category;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: tutorials } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, tutorials, totalPages, currentPage };
};

const addPost = async (req, res) => {
  let info = {
    category_id: req.body.category_id,
    image: req.file.path,
    title: req.body.title,
    username: req.body.username,
    description: req.body.description,
  };

  const post = await Post.create(info);
  res.status(200).send(post);
  console.log(post);
  if (post.affectedRows === 1) {
    return res.json({ success: true });
  }
};

const findAll = async (req, res) => {
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  Post.findAndCountAll({ where: condition, limit, offset })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

const getAllPosts = async (req, res) => {
  let post = await Post.findAll({
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["id", "name"],
      },
    ],
  });
  res.status(200).send(post);
};

const getOnePost = async (req, res) => {
  let id = req.params.id;
  let post = await Post.findByPk(id, {
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["id", "name"],
      },
    ],
  });
  if (post.length > 0) {
    return res.json({ success: true, listId: post });
  }
  res.status(200).send(post);
};

const updatePost = async (req, res) => {
  let id = req.params.id;

  const post = await Post.update(req.body, { where: { id: id } });
  if (post.affectedRows === 1) {
    return res.json({ success: true });
  }

  res.status(200).send(post);
};

const deletePost = async (req, res) => {
  let id = req.params.id;

  await Post.destroy({
    where: { id: id },
  });

  res.status(200).send("Post is deleted !");
};

const getPostComment = async (req, res) => {
  const id = req.params.id;

  const data = await Post.findOne({
    include: [
      {
        model: Comment,
        as: "comment",
      },
    ],
    where: { id: id },
  });

  res.status(200).send(data);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "1000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("image");

module.exports = {
  addPost,
  getAllPosts,
  getOnePost,
  updatePost,
  deletePost,
  getPostComment,
  upload,
  getPagination,
  getPagingData,
  findAll,
};
