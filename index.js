require('express-async-errors');
require('winston-mongodb');

const express = require('express');
const mongoose = require('mongoose');
const debugDB = require('debug')('app:database');
const debugApp = require('debug')('app:app');
const register = require('./routes/register');
const login = require('./routes/login');
const movies = require('./routes/movies');
const logout = require('./routes/logout');
const error = require('./middleware/error');
const morgan = require('morgan')

const app = express();


app.use(morgan('tiny'));


mongoose.connect('mongodb://localhost/vidly')
    .then(() => debugDB('Connection to database is started'))
    .catch(err => debugDB('Error: ', err.message));
app.use(express.json());

app.use('/api/register', register);
app.use('/api/login', login);
app.use('/api/logout', logout);
app.use('/api/movies', movies);
app.use(error);

app.listen(4000, () => debugApp('The server is starting'));