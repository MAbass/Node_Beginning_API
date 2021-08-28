const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const {UserModel, validateUser} = require('../models/user');
const config = require("config");
const debug = require("debug")("app:application");

const router = express.Router();

if (!config.get('jwtPrivateKey')) {
    debug("FATAL ERROR: jwtPrivateKey is not found");
    process.exit(1);
}

router.post('/', async (req, res) => {
    const {error} = validateUser(req.body);
    if (error) res.status(400).send({message: error.details[0].message})
    else {
        let emailUser = null;
        await UserModel.findOne({email: req.body.email})
            .then(data => {
                emailUser = data;
            })
            .catch(() => {
                return res.status(500).send('The server encountered error');
            });
        if (emailUser) return res.status(400).send("The email does exist")

        const user = await UserModel(_.pick(req.body, ['password', 'email', 'name', 'isAdmin']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user.save();

    }
})

module.exports = router