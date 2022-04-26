const db = require("../models");
const multer = require("multer");
const path = require("path");
const Post = db.post;
const Comment = db.comment;
const Category = db.category;

const addPost = async (req, res) => {
  let info = {
    image: req.file.path,
    title: req.body.title,
    name: req.body.name,
    description: req.body.description,
  };

  const post = await Post.create(info);
  res.status(200).send(post);
  console.log(post);
  if (post.affectedRows === 1) {
    return res.json({ success: true });
  }
};

const getAllPosts = async (req, res) => {
  let posts = await Post.findAll({
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  res.status(200).send(posts);
};

const getOnePost = async (req, res) => {
  let id = req.params.id;
  let post = await Post.findByPk(id, {
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
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
};
