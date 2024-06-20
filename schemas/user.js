const Joi = require("joi");

const emailRegexp =
    /^([a-zA-Z0-9_.]+){1}([a-zA-Z0-9_\-.]+){1}@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,3})$/;

const schema = Joi.object({
    email: Joi.string().email().pattern(emailRegexp).required(),
    password: Joi.string().min(8).required(),
});

module.exports = schema;
