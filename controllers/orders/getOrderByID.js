const orderContactType = require("../../constants/orderContactType");
const orderStatus = require("../../constants/orderStatus");
const { SUCCESS, NOT_FOUND } = require("../../constants/statusCode");
const renameDesc = require("../../helpers/renameDesc");
const selectLang = require("../../helpers/selectLang");
const Order = require("../../models/order");

const getOrderByID = async (req, res) => {
    const { orderId } = req.params;
    const { lang } = req.query;

    const order = await Order.findById(orderId)
        .populate({
            path: "orderItems",
            populate: {
                path: "product",
                select: `_id desc_${lang}.title desc_${lang}.weight desc_${lang}.per_package`,
            },
        })
        .exec();

    if (!order) {
        return res.status(NOT_FOUND).json({
            success: false,
            message: "Order does not exist",
        });
    }

    order.status = orderStatus[order.status][lang];
    order.connection_type = orderContactType[order.connection_type][lang];

    res.status(SUCCESS).json({
        success: true,
        data: renameDesc(order, lang),
    });
};

module.exports = getOrderByID;
