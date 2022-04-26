const dbConfig = require("../config/database.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.post = require("./postModel.js")(sequelize, DataTypes);
db.comment = require("./commentModel.js")(sequelize, DataTypes);
db.category = require("./categoryModel.js")(sequelize, DataTypes);
db.user = require("./userModel.js")(sequelize, DataTypes, Sequelize);

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

// One to Many
db.post.hasMany(db.comment, {
  foreignKey: "post_id",
  as: "comment",
});

db.comment.belongsTo(db.post, {
  foreignKey: "post_id",
  as: "post",
});

// Many to Many
db.category.belongsToMany(db.post, {
  through: "post_category",
  as: "post",
  foreignKey: "category_id",
});
db.post.belongsToMany(db.category, {
  through: "post_category",
  as: "category",
  foreignKey: "post_id",
});

module.exports = db;
