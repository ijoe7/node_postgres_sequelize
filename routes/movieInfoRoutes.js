const express = require("express");
const router = express.Router();
const movieInfo = require("../controllers/movieInfo");

// router.get("/", gigController.sendGig);
router.get("/getMovies", movieInfo.getMovies);
router.get("/getAllMovies", movieInfo.getAllMovies);
router.post("/postMovieComment", movieInfo.postMovieComment);
router.delete("/deleteMovieComment", movieInfo.deleteMovieComment);
router.post("/movieCharactersInfo/:id", movieInfo.movieCharactersInfo);

module.exports = router;
