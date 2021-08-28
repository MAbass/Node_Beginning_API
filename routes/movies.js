const _ = require('lodash');
const express = require('express');
const {MovieModel, validateMovie} = require('../models/movies');
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/admin')

const router = express.Router();


router.post('/add', auth, async (req, res) => {
    let movieSave = null;

    const {error} = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const movie = MovieModel(_.pick(req.body, ["author", "title", "description"]));
    movieSave = await movie.save();
    res.send(_.pick(movieSave, ["author", "title", "description", "_id"]));
});

router.get('/', auth, async (req, res) => {
    let allMovies = await MovieModel.find().select('[-__v, -_id]')
    res.send(allMovies);

});

router.delete('/:id', [auth, adminAuth], async (req, res) => {
    const findMovie = await MovieModel.findById(req.params.id)
    if (!findMovie) return res.status(400).send("This movie does not exist");
    MovieModel.deleteOne(findMovie)
        .then((data) => {
            res.send(`The movie is delete successfully ${data}`);
        })
        .catch((err) => {
            res.send(`The deletion of the movie encountered problem: ${err} `);
        });

});

module.exports = router