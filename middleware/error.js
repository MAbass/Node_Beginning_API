const logger = require('../config/logger');

function error(err, req, res, next) {
    logger.error(err.message);
    //information

    //warning

    //verbose

    //debug

    //silly


    res.status(500).send('The server encountered a problem');
    next();
}

module.exports = error