const { SUCCESS, NOT_FOUND } = require("../../constants/statusCode");
const Product = require("../../models/product");

const deleteProductById = async (req, res) => {
    const { productId } = req.params;

    const product = await Product.findByIdAndUpdate(productId, {
        isAvailable: false,
    });

    if (!product) {
        return res.status(NOT_FOUND).json({
            success: false,
            message: "Product does not exist",
        });
    }

    res.status(SUCCESS).json({ success: true });
};

module.exports = deleteProductById;
