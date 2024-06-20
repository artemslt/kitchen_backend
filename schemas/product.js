const Joi = require("joi");

const descriptionSchema = Joi.object({
    category: Joi.string()
        .valid(
            "Сніданки",
            "Основні страви",
            "Супи",
            "Снеки та напої",
            "Breakfasts",
            "Main courses",
            "Soups",
            "Snacks and beverages"
        )
        .required(),

    title: Joi.string().required(),
    compound: Joi.string().required(),
    description: Joi.string().required(),
    cooking_method: Joi.string().required(),
    weight: Joi.string().required(),
    expiration_date: Joi.string().required(),
    per_package: Joi.number().required(),
    cooking_method_short: Joi.string().required(),
});

const schema = Joi.object({
    desc_uk: descriptionSchema,
    desc_en: descriptionSchema,
    imgUrls: Joi.array().items(Joi.string()),
    isAvailable: Joi.boolean().default(false),
});

module.exports = schema;
