const Joi = require('@hapi/joi');

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
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required()
    }).validate(req.body);
    if (result.error) return res.status(400).json({success: false, message: result.error});
    next();
}