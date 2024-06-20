const Order = require("../../models/order");
const { SUCCESS, NOT_FOUND } = require("../../constants/statusCode");
const result = require("../../helpers/orderResFields");

const getAllOrders = async (req, res) => {
    const { page = 1, limit = 10, lang, status } = req.query;
    const skip = (page - 1) * limit;

    let queryObj = {};

    if (status) {
        queryObj.status = status;
    }

    const count = await Order.countDocuments(queryObj);

    const items = await Order.find(queryObj, "", {
        skip,
        limit: Number(limit),
    })
        .sort({ createdAt: -1 })
        .exec();

    if (!items.length) {
        return res.status(NOT_FOUND).json({
            success: false,
            message: "There is no orders",
        });
    }

    const orders = result(items, lang);

    res.status(SUCCESS).json({
        success: true,
        quantity: count,
        perPage: Number(limit),
        page: Number(page),
        data: orders,
    });
};

module.exports = getAllOrders;
