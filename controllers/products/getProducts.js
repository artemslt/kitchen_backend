const { SUCCESS, NOT_FOUND } = require("../../constants/statusCode");
const productResFields = require("../../helpers/productResFields");
const selectLang = require("../../helpers/selectLang");
const Product = require("../../models/product");

const getProducts = async (req, res) => {
    const { lang, ids } = req.query;

    const items = await Product.find({
        _id: { $in: ids.split(",") },
    })
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
        quantity: items.length,
        data: result,
    });
};

module.exports = getProducts;
