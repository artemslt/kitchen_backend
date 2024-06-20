const { model, Schema } = require("mongoose");

const accountSchema = Schema(
    {
        title_en: {
            type: String,
            require: true,
        },
        title_uk: {
            type: String,
            require: true,
        },
        name_en: {
            type: String,
        },
        name_uk: {
            type: String,
        },
        value: {
            type: String,
            require: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: false,
        versionKey: false,
    }
);

const AccountInfo = model("accountInfo", accountSchema);

module.exports = AccountInfo;
