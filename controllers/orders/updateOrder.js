const { SUCCESS, NOT_FOUND } = require("../../constants/statusCode");
const orderStatus = require("../../constants/orderStatus");
const orderContactType = require("../../constants/orderContactType");
const reversOrderFields = require("../../helpers/reversOrderFields");
const Order = require("../../models/order");

const updateOrder = async (req, res) => {
    const { orderId } = req.params;
    const { lang } = req.query;

    const orderFields = {
        ...req.body,
        status: reversOrderFields(orderStatus, req.body.status, lang),
        connection_type: reversOrderFields(
            orderContactType,
            req.body.connection_type,
            lang
        ),
    };

    const order = await Order.findByIdAndUpdate(orderId, { ...orderFields });

    if (!order) {
        return res.status(NOT_FOUND).json({
            success: false,
            message: "Order does not exist",
        });
    }

    res.status(SUCCESS).json({
        success: true,
        data: { ...orderFields, orderId },
    });
};

module.exports = updateOrder;
