const { SUCCESS, NOT_FOUND } = require("../../constants/statusCode");
const productResFields = require("../../helpers/productResFields");
const selectLang = require("../../helpers/selectLang");
const Product = require("../../models/product");

const getProductsInStock = async (req, res) => {
    const { lang } = req.query;

    const count = await Product.countDocuments({ isAvailable: true });

    const items = await Product.find({ isAvailable: true })
        .select(selectLang(lang))
        .sort({ createdAt: -1 })
        .exec();

    if (!items.length) {
        return res.status(NOT_FOUND).json({
            success: false,
            message: "There is no product",
        });
    }

    const result = items.map(item => {
        return {
            title: item[`desc_${lang}`].title,
            id: item._id,
        };
    });

    res.status(SUCCESS).json({
        success: true,
        quantity: count,
        data: result,
    });
};

module.exports = getProductsInStock;
