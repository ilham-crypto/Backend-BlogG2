module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "user",
    {
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      refresh_token: {
        type: DataTypes.TEXT,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return Users;
};
