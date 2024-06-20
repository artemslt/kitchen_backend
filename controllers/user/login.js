const User = require("../../models/user");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SUCCESS, BAD_REQUEST } = require("../../constants/statusCode");

const { SECRET_KEY } = process.env;

const sigIn = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        res.status(BAD_REQUEST).json({
            success: false,
            message: "Incorrect email or password",
        });
    }
    const passCompare = bcryptjs.compareSync(password, user.password);

    if (!passCompare) {
        res.status(BAD_REQUEST).json({
            success: false,
            message: "Incorrect email or password",
        });
    }
    const payload = {
        id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY);

    await User.findByIdAndUpdate(user._id, { token });

    const { _id, isAdmin } = user;

    res.status(SUCCESS).json({
        success: true,
        data: {
            user: { _id, email, isAdmin },
            token,
        },
    });
};

module.exports = sigIn;
