const Joi = require("joi");

const schema = Joi.object({
    title_en: Joi.string().required(),
    title_uk: Joi.string().required(),
    name_en: Joi.string().allow(null, ""),
    name_uk: Joi.string().allow(null, ""),
    value: Joi.string().required(),
    isActive: Joi.boolean().default(true),
});

module.exports = schema;
