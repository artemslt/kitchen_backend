const { model, Schema } = require("mongoose");

const descriptionSchema = Schema({
    category: {
        type: String,
        enum: [
            "Сніданки",
            "Основні страви",
            "Супи",
            "Снеки та напої",
            "Breakfasts",
            "Main courses",
            "Soups",
            "Snacks and beverages",
        ],
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    compound: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    cooking_method: {
        type: String,
        required: true,
    },
    weight: {
        type: String,
        required: true,
    },
    expiration_date: {
        type: String,
        required: true,
    },
    per_package: {
        type: Number,
        required: true,
    },
    cooking_method_short: {
        type: String,
        required: true,
    },
    _id: false,
});

const productSchema = Schema(
    {
        desc_uk: descriptionSchema,
        desc_en: descriptionSchema,

        imgUrls: {
            type: [String],
        },
        isAvailable: {
            type: Boolean,
            default: false,
        },
    },
    { versionKey: false, timestamps: true }
);

const Product = model("product", productSchema);

module.exports = Product;
