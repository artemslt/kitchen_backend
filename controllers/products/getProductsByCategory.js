const { SUCCESS, NOT_FOUND } = require("../../constants/statusCode");
const productResFields = require("../../helpers/productResFields");
const selectLang = require("../../helpers/selectLang");
const Product = require("../../models/product");

const getByCategory = async (req, res) => {
    const { page = 1, limit = 10, lang } = req.query;
    const { category } = req.params;

    const skip = (page - 1) * limit;

    const count = await Product.countDocuments({
        [`desc_${lang}.category`]: category,
    });

    const items = await Product.find({
        [`desc_${lang}.category`]: category,
    })
        .select(selectLang(lang))
        .sort({ isAvailable: -1, updatedAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec();

    if (!items.length) {
        return res.status(NOT_FOUND).json({
            success: false,
            message: "There is no product",
        });
    }
    const result = items.map(item => productResFields(item, lang));

    res.status(SUCCESS).json({
        success: true,
        quantity: count,
        data: result,
    });
};

module.exports = getByCategory;
