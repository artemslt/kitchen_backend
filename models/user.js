const { model, Schema } = require("mongoose");

const userSchema = Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
            required: true,
        },
        token: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const User = model("user", userSchema);

module.exports = User;
