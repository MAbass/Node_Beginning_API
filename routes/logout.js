const express = require('express');
const jwt = require('jsonwebtoken');
const debug = require("debug")("app:application");
const config = require('config')
const auth = require('../middleware/auth')

const router = express.Router();

if (!config.get('jwtPrivateKey')) {
    debug("FATAL ERROR: jwtPrivateKey is not found");
    process.exit(1);
}
router.get("/", auth, async (req, res) => {
    const getToken = req.header('x-auth-token');
    debug("Token = ", getToken);
    const destroyed = jwt.destroy(getToken);
    debug("Destroyed = ", destroyed);
});

module.exports = router