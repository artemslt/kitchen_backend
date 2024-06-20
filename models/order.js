const { model, Schema } = require("mongoose");

const orderSchema = Schema(
    {
        orderItems: [
            {
                quantity: {
                    type: Number,
                    required: true,
                },
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "product",
                    required: true,
                },
                _id: false,
            },
        ],

        name: {
            type: String,
            require: true,
        },
        connection_type: {
            type: String,
            enum: ["sms", "call", "signal", "telegram", "whatsapp", "viber"],
            required: true,
        },
        phone: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
        },
        status: {
            type: String,
            enum: ["new", "completed", "cancelled", "processing"],
            default: "new",
        },
        comments: {
            type: String,
        },
        order_id: {
            type: String,
        },
        accepted_data_collection: {
            type: Boolean,
            require: true,
        },
    },
    { versionKey: false, timestamps: true }
);

const Order = model("orders", orderSchema);

module.exports = Order;
