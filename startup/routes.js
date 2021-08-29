const express = require('express');


const register = require('../routes/register');
const login = require('../routes/login');
const movies = require('../routes/movies');
const logout = require('../routes/logout');
const error = require('../middleware/error');

const app = express();

function routes(app) {
    app.use('/api/register', register);
    app.use('/api/login', login);
    app.use('/api/logout', logout);
    app.use('/api/movies', movies);
    app.use(error);
}


module.exports = routes;