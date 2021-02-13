const Joi = require('@hapi/joi');
const Book = require('../models/Book');
const User = require('../models/User');

exports.login = (req, res, next) => {
    const result = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    }).validate(req.body);
    if (result.error) return res.status(400).json({success: false, message: result.error});
    next();
}

exports.signup = (req, res, next) => {
    const result = Joi.object({
        username: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().message('Invalid email format').required(),
        password: Joi.string().min(5).message('Password needs to be at least 5 characters long').required()
    }).validate(req.body);
    if (result.error) return res.status(400).json({success: false, message: result.error});
    next();
}