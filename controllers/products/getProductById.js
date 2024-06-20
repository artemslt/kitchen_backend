const { SUCCESS, NOT_FOUND } = require("../../constants/statusCode");
const productResFields = require("../../helpers/productResFields");
const selectLang = require("../../helpers/selectLang");
const Product = require("../../models/product");

const getProductById = async (req, res) => {
    const { productId } = req.params;
    const { lang } = req.query;

    const item = await Product.findById(productId)
        .select(selectLang(lang))
        .sort({ createdAt: -1 })
        .exec();

    if (!item) {
        return res.status(NOT_FOUND).json({
            success: false,
            message: "Product does not exist",
        });
    }

    const result = !lang ? item : productResFields(item, lang);

    res.status(SUCCESS).json({
        success: true,
        data: result,
    });
};

module.exports = getProductById;
