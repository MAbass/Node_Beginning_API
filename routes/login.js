const bcrypt = require('bcrypt');
const express = require('express');
const _ = require('lodash');
const {UserModel} = require('../models/user');
const Joi = require("Joi");
const debug = require("debug")("app:application");
const config = require('config')
const auth = require('../middleware/auth')

const router = express.Router();

if (!config.get('jwtPrivateKey')) {
    debug("FATAL ERROR: jwtPrivateKey is not found");
    process.exit(1);
}
router.get("/me", auth, async (req, res) => {
    const userFound = await UserModel.findById(req.user._id);
    res.send(_.pick(userFound, ['name', 'email']));
});

router.post('/', async (req, res, next) => {
    const {error} = validateLogin(req.body);
    if (error) res.status(400).send({message: error.details[0].message})
    else {
        let user = await UserModel.findOne({email: req.body.email})
        if (!user) res.status(400).send("The email or password is not valid");
        else {
            const value = await bcrypt.compare(req.body.password, user.password)
            if (!value) return res.status(400).send("The email or password is not valid")
            const token = user.generateAuthToken();
            res.header('x-auth-token', token).status(200).send({
                message: `U're authenticated and token : ${token} is saved in u're headers in the variable x-auth-token`,
                user: _.pick(user, ['id', 'email', 'name'])
            });
        }
    }
});

function validateLogin(data) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
    }
    return Joi.validate(data, schema);
}

module.exports = router