const express = require("express");
const { ctrlWrapper } = require("../middleware/controllerWrapper");

const createOrder = require("../controllers/orders/createOrder");
const getOrderByID = require("../controllers/orders/getOrderByID");
const getAllOrders = require("../controllers/orders/getAllOrders");
const updateOrder = require("../controllers/orders/updateOrder");
const deleteOrderByID = require("../controllers/orders/deleteOrder");
const findOrder = require("../controllers/orders/findOrder");
const auth = require("../middleware/auth");
const validation = require("../middleware/validation");
const schema = require("../schemas/order");

const router = express.Router();

router.get("/", auth, ctrlWrapper(getAllOrders));
router.post("/", validation(schema), ctrlWrapper(createOrder));
router.get("/order/:orderId", auth, ctrlWrapper(getOrderByID));
router.patch(
    "/order/:orderId",
    auth,
    validation(schema),
    ctrlWrapper(updateOrder)
);
router.delete("/order/:orderId", auth, ctrlWrapper(deleteOrderByID));
router.get("/search/:order", auth, ctrlWrapper(findOrder));

module.exports = router;
