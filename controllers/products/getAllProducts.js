const { SUCCESS, NOT_FOUND } = require("../../constants/statusCode");
const productResFields = require("../../helpers/productResFields");
const selectLang = require("../../helpers/selectLang");
const Product = require("../../models/product");

const getAllProducts = async (req, res) => {
    const { lang } = req.query;

    const count = await Product.countDocuments({});

    const items = await Product.find()
        .select(selectLang(lang))
        .sort({ createdAt: -1 })
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

module.exports = getAllProducts;
