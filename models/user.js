const Joi = require('Joi');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxLength: 50,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxLength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxLength: 1024
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
};

const UserModel = mongoose.model("User", userSchema);

function validateUser(data) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
        isAdmin: Joi.boolean(),
    }
    return Joi.validate(data, schema);
}

module.exports.validateUser = validateUser;
module.exports.UserModel = UserModel;
