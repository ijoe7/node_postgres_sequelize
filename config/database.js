const Sequelize = require("sequelize");
const db = new Sequelize("metacare", "postgres", "1234", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = db;