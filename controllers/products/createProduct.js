require("dotenv").config();

const fs = require("fs/promises");
const cloudinary = require("cloudinary").v2;

const Product = require("../../models/product");
const { CREATED } = require("../../constants/statusCode");

const { CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET } = process.env;

// Configuration
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_KEY,
    api_secret: CLOUD_SECRET,
});

const addProduct = async (req, res) => {
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

    const newProduct = await Product.create({ ...req.body, imgUrls });

    res.status(CREATED).json({
        success: true,
        message: "Товар було успішно доданно.",
        data: {
            newProduct,
        },
    });
};

module.exports = addProduct;
