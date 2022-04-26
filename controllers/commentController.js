const db = require("../models");
const Comment = db.comment;
const Post = db.post;

const addComment = async (req, res) => {
  const id = req.params.id;

  let data = {
    post_id: id,
    username: req.body.username,
    text: req.body.text,
  };

  const comment = await Comment.create(data);
  res.status(200).send(comment);
};

const getAllComments = async (req, res) => {
  const comments = await Comment.findAll({});
  res.status(200).send(comments);
};

// const getOneComment = async (req, res) => {
//   let id = req.params.id;
//   let post = await Comment.findByPk(id, {
//     include: [
//       {
//         model: Post,
//         as: "post",
//         attributes: ["id", "name", "image", "title", "description"],
//         through: {
//           attributes: [],
//         },
//       },
//     ],
//   });
//   res.status(200).send(post);
// };

// const updateComment = async (req, res) => {
//   let id = req.params.id;

//   const comment = await Comment.update(req.body, { where: { id: id } });

//   res.status(200).send(comment);
// };

const deleteComment = async (req, res) => {
  let id = req.params.id;

  await Comment.destroy({ where: { id: id } });

  res.status(200).send("Comment is deleted !");
};

module.exports = {
  addComment,
  getAllComments,
  // updateComment,
  deleteComment,
  // getOneComment,
};
