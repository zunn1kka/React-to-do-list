const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Users = sequelize.define("users", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  login: { type: DataTypes.STRING(60), unique: true, allowNull: false },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true },
  },
  password: { type: DataTypes.STRING(256), allowNull: false },
});

const Tasks = sequelize.define(
  "tasks",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    dueDate: { type: DataTypes.DATE },
    isComplete: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    indexes: [{ fields: ["isComplete"] }],
  }
);

Users.hasMany(Tasks, { onDelete: "CASCADE" });
Tasks.belongsTo(Users);

module.exports = {
  Users,
  Tasks,
};
