const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const { SUCCESS, BAD_REQUEST } = require("../../constants/statusCode");

require("dotenv").config();

const { SECRET_KEY } = process.env;

const newPass = async (req, res) => {
    const { resetToken, password } = req.body;

    const user = await User.findOne({ token: resetToken });
    if (!user) {
        return res.status(BAD_REQUEST).json({
            success: false,
            message: "Invalid token",
        });
    }
    const payload = {
        id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY);
    const hashPassword = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
    await User.findByIdAndUpdate(user._id, { password: hashPassword, token });
    const { _id, name, email, location, birthday, phone, avatarURL } = user;
    res.status(SUCCESS).json({
        success: true,
        data: {
            user: { _id, name, email, birthday, location, phone, avatarURL },
            token,
        },
    });
};

module.exports = newPass;
