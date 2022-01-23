const Sequelize = require("sequelize");
const db = require("../config/database");
const Comment = require("./comment");

const Movie = db.define("movie", {
    movie_title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    opening_crawl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    comment_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
})

// Movie.hasMany(Comment, {
//     as: "comments"
// })

module.exports = Movie;