const { SUCCESS, NOT_FOUND } = require("../../constants/statusCode");
const productResFields = require("../../helpers/productResFields");
const selectLang = require("../../helpers/selectLang");
const Product = require("../../models/product");

const findProduct = async (req, res) => {
    const { search, lang } = req.query;

    const items = await Product.find({
        [`desc_${lang}.title`]: { $regex: `${search}`, $options: "i" },
    })
        .select(selectLang(lang))
        .sort({ createdAt: -1 })
        .exec();

    if (!items.length) {
        return res.status(NOT_FOUND).json({
            success: false,
            message: "There is no products match search",
        });
    }

    const result = items.map(item => productResFields(item, lang));

    res.status(SUCCESS).json({
        success: true,
        quantity: items.length,
        data: result,
    });
};

module.exports = findProduct;
