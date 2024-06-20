const express = require("express");
const { ctrlWrapper } = require("../middleware/controllerWrapper");
const upload = require("../middleware/upload");

const addProduct = require("../controllers/products/createProduct");
const getAllProducts = require("../controllers/products/getAllProducts");
const getProductById = require("../controllers/products/getProductById");
const deleteProductById = require("../controllers/products/deleteProductById");
const updateProduct = require("../controllers/products/updateProduct");
const findProduct = require("../controllers/products/findProduct");
const getProducts = require("../controllers/products/getProducts");
const getByCategory = require("../controllers/products/getProductsByCategory");
const getProductsInStock = require("../controllers/products/getProductsInStock");
const auth = require("../middleware/auth");
const validation = require("../middleware/validation");
const schema = require("../schemas/product");

const router = express.Router();

router.get("/", ctrlWrapper(getAllProducts));
router.get("/stock", ctrlWrapper(getProductsInStock));
router.get("/search", ctrlWrapper(findProduct));
router.get("/catalog/:productId", ctrlWrapper(getProductById));
router.get("/multiple", ctrlWrapper(getProducts));
router.get("/category/:category", ctrlWrapper(getByCategory));
router.delete("/catalog/:productId", auth, ctrlWrapper(deleteProductById));
router.post(
    "/",
    auth,
    validation(schema),
    upload.array("image", 3),
    ctrlWrapper(addProduct)
);
router.patch(
    "/catalog/:productId",
    auth,
    validation(schema),
    upload.array("image", 3),
    ctrlWrapper(updateProduct)
);

module.exports = router;
