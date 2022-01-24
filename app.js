const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const helper = require('./config/helper');
const cors = require('cors');
const movieInfoRouter = require('./routes/movieInfoRoutes');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Database connection
const db = require('./config/database');

// Test DB connection
helper.testDB(db);

// Associate models
const Movie = require('./model/movie');
const Comment = require('./model/comment');

Movie.hasMany(Comment, {
  as: "comments",
});
Comment.belongsTo(Movie, {
  foreignKey: "movieId",
  as: "movie",
});

db.sync({
  // force: false,
})
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use('/movieInfo', movieInfoRouter);

app.use('/', (req, res) => {
  res.send('Hello, Welcome to the Movie Info API');
});

engines = {
  "node": "14.16.0",
  "npm": "8.1.0"
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
 });