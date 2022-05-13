module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("post", {
    image: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    kategori: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.TEXT,
    },
  });

  return Post;
};
