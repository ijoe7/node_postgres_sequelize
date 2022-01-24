const axios = require('axios');
const db = require('../config/database');
const Movie = require('../model/movie');
const Comment = require('../model/comment');
const helper = require('../config/helper');

exports.getMovies = async (req, res) => { 
    try {
        const databaseData = await Movie.findAll({
            include: ["comments"],
            order: [['id', 'ASC']]
        });
        if (databaseData.length === 0) {
            const data = await axios.get(`https://swapi.py4e.com/api/films/`);
            const allMovieInfo = data.data.results;
            for (let i = 0; i < allMovieInfo.length; i++) {
                const movie = await Movie.create({
                    movie_title: allMovieInfo[i].title,
                    opening_crawl: allMovieInfo[i].opening_crawl,
                    comment_count: 0
                });
            }
            let savedData = await Movie.findAll({
              include: ["comments"],
              order: [["id", "ASC"]]
            });
            const reversedComments = helper.reverseComments(savedData);
            res.status(201).send(reversedComments);
        } else {
            const reversedComments = helper.reverseComments(databaseData);
            res.status(201).send(databaseData);
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
};

exports.getAllMovies = async (req, res) => {
    try {
        let databaseData = await Movie.findAll({
            include: ["comments"],
            order: [["id", "ASC"]],
        });
        const reversedComments = helper.reverseComments(databaseData);
        res.status(200).send(reversedComments);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
};

exports.postMovieComment = async (req, res) => {
    try {
        let { movieId, movie_comment } = req.body;
        var ip_address = req.header("x-forwarded-for") || req.connection.remoteAddress;
        console.log(ip_address);
        const comment = await Comment.create({
            movie_comment,
            movieId,
            ip_address
        });
        const movie = await Movie.findByPk(movieId);
        movie.comment_count += 1;
        movie.save();
        res.status(201).send(comment);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
};

exports.deleteMovieComment = async (req, res) => {
    try {
        let { movieId, commentId } = req.body;
        const comment = await Comment.findByPk(commentId);
        const movie = await Movie.findByPk(movieId);
        movie.comment_count -= 1;
        movie.save();
        // destroy comment and restart id sequence
        comment.destroy({ truncate: true, restartIdentity: false });

        res.status(200).send(comment);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
};

exports.movieCharactersInfo = async (req, res) => {
    try {
        const { id } = req.params;
        let { nameSort, heightSort, genderSort, genderFilter } = req.query;

        if (id < 1 || id > 7) return res.status(400).send("Movie ID must be between 1 and 7");
        
        const data = await axios.get(`https://swapi.py4e.com/api/films/${id}/`);
        const movieData = data.data;

        let characterList = await helper.getCharacterList(movieData);

        // Filter character List
        if (genderFilter) {
            characterList = characterList.filter(character => character.gender.toLocaleLowerCase() === genderFilter.toLocaleLowerCase());
        };

        // sort by name, height or gender
        if (nameSort || genderSort || heightSort) {
            let sortedData = helper.sortCharacters(characterList, nameSort, genderSort, heightSort);
            const result = await helper.getResult(sortedData);
            res.status(200).send(result);
        } else {
            const result = await helper.getResult(characterList);
            res.status(200).send(result);
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
};