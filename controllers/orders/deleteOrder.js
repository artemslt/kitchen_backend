const Order = require("../../models/order");
const { SUCCESS, NOT_FOUND } = require("../../constants/statusCode");

const deleteOrderByID = async (req, res) => {
    const { orderId } = req.params;

    const order = await Order.findByIdAndDelete(orderId).exec();

    if (!order) {
        return res.status(NOT_FOUND).json({
            success: false,
            message: "Order does not exist",
        });
    }

    res.status(SUCCESS).json({ success: true });
};

module.exports = deleteOrderByID;
