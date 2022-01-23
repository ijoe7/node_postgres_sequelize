const Sequelize = require("sequelize");
const db = require("../config/database");
const Movie = require("./movie");

const Comment = db.define("comment", {
    movie_comment: {
        type: Sequelize.STRING(500),
        allowNull: false
    },
    ip_address: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

// Comment.belongsTo(Movie, {
//     foreignKey: "movie_id",
//     as: "movie"
// });

module.exports = Comment;