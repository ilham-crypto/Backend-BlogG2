module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("comment", {
    username: {
      type: DataTypes.STRING,
    },
    text: {
      type: DataTypes.TEXT,
    },
  });

  return Comment;
};
