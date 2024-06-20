const { CREATED, BAD_REQUEST } = require("../../constants/statusCode");
const User = require("../../models/user");

const bcryptjs = require("bcryptjs");

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(BAD_REQUEST).json({
            success: false,
            message: `User with email ${email} already exists`,
        });
    }
    const hashPassword = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
    const result = await User.create({
        email,
        password: hashPassword,
    });

    const { _id } = result;

    res.status(CREATED).json({
        success: true,
        data: {
            _id,
            email,
        },
    });
};

module.exports = register;
