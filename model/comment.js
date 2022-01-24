const Sequelize = require("sequelize");
const db = require("../config/database");
const Movie = require("./movie");

const Comment = db.define("comment", {
    movie_comment: {
        type: Sequelize.STRING(5000),
        allowNull: false
    },
    ip_address: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Comment;