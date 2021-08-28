const mongoose = require('mongoose');
const Joi = require('joi');



const userSchema = new mongoose.Schema({
    author: {
        type: String,
        min:5,
        required: true
    },
    description: {
        type:String,
        min:20,
        required:true
    },
    title: {
        type:String,
        required:true,
        min: 5
    }
});

const MovieModel = mongoose.model("Movies", userSchema);


function validateMovie(data){

    const schema = {
        author:Joi.string().min(5).required(),
        description:Joi.string().min(20).required(),
        title:Joi.string().min(5).required(),
    }

    return Joi.validate(data, schema);

}

module.exports.MovieModel = MovieModel;
module.exports.validateMovie = validateMovie;