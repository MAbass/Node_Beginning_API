require('express-async-errors');
require('winston-mongodb');

const express = require('express');
const mongoose = require('mongoose');
const debugDB = require('debug')('app:database');
const debugApp = require('debug')('app:app');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./startup/routes');
routes(app);

mongoose.connect('mongodb://localhost/vidly')
    .then(() => debugDB('Connection to database is started'))
    .catch(err => debugDB('Error: ', err.message));
app.use(express.json());


app.listen(4000, () => debugApp('The server is starting'));