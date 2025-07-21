const { Sequelize } = require("sequelize");
require("dotenv").config();
if (!process.env.DB_PASSWORD) {
  throw new Error("DB_PASSWORD не указан в .env файле");
}

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  dialect: "postgres",
  logging: false,
});

module.exports = sequelize;
