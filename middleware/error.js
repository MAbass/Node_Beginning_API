const logger = require('../config/logger');

function error(err, req, res, next) {
    console.log(err);
    // logger.error(err.message);
    res.status(500).send('The server encountered a problem');
    next();
}

module.exports = error