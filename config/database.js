const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const db = new Sequelize("metacare", "postgres", "1234", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = db;