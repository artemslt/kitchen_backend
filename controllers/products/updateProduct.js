require("dotenv").config();

const fs = require("fs/promises");
const cloudinary = require("cloudinary").v2;

const Product = require("../../models/product");
const { SUCCESS, NOT_FOUND } = require("../../constants/statusCode");

const { CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET } = process.env;

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_KEY,
    api_secret: CLOUD_SECRET,
});

const updateProduct = async (req, res) => {
    const { productId } = req.params;
    const imgUrls = [];

    const { files } = req;

    for (const file of files) {
        const { path } = file;
        await cloudinary.uploader.upload(path, (err, res) => {
            if (err) return res.status(500).send("upload image error");
            imgUrls.push(res.secure_url);
            fs.unlink(path);
        });
    }
    const product = await Product.findByIdAndUpdate(productId, {
        ...req.body,
        imgUrls,
    });

    if (!product) {
        return res.status(NOT_FOUND).json({
            success: false,
            message: "Product does not exist",
        });
    }

    res.status(SUCCESS).json({
        success: true,
    });
};

module.exports = updateProduct;
