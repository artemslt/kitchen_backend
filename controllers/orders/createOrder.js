const { CREATED } = require("../../constants/statusCode");
const reversOrderFields = require("../../helpers/reversOrderFields");
const orderContactType = require("../../constants/orderContactType");
const Order = require("../../models/order");

const createOrder = async (req, res) => {
    const { lang } = req.query;

    const result = await Order.countDocuments({});
    const orderCounter = 1000000 + result;

    const orderFields = {
        ...req.body,
        connection_type: reversOrderFields(
            orderContactType,
            req.body.connection_type,
            lang
        ),
    };

    const newOrder = await Order.create({
        ...orderFields,
        order_id: orderCounter,
    });

    res.status(CREATED).json({
        success: true,
        message: "Замовлення було успішно доданно.",
        data: newOrder,
    });
};

module.exports = createOrder;
