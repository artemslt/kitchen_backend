const { SUCCESS, NOT_FOUND } = require("../../constants/statusCode");
const orderStatus = require("../../constants/orderStatus");
const Order = require("../../models/order");

const findOrder = async (req, res) => {
    const { lang } = req.query;
    const { order } = req.params;

    const item = await Order.findOne({ order_id: order }).exec();

    if (!item) {
        return res.status(NOT_FOUND).json({
            success: false,
            message: "There is no order match search",
        });
    }

    item.status = orderStatus[item.status][lang];

    res.status(SUCCESS).json({
        success: true,
        data: item,
    });
};

module.exports = findOrder;
