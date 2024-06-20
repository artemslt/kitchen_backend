const Joi = require("joi");

const schema = Joi.object({
    orderItems: Joi.array().items(
        Joi.object({
            quantity: Joi.number().required(),
            product: Joi.string().required(),
        })
    ),
    name: Joi.string().required(),
    connection_type: Joi.string()
        .valid(
            "Confirmation call",
            "SMS confirmation",
            "Signal",
            "Telegram",
            "WhatsApp",
            "Viber",
            "Дзвінок",
            "SMS на мобільний"
        )
        .required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    status: Joi.string()
        .valid(
            "New",
            "Completed",
            "Cancelled",
            "Processing",
            "Нове",
            "В роботі",
            "Виконано",
            "Скасовано"
        )
        .default(false),
    comments: Joi.string().allow(""),
    accepted_data_collection: Joi.boolean().valid(true).required(),
});

module.exports = schema;
