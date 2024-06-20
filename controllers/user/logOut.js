const { NO_CONTENT } = require("../../constants/statusCode");
const User = require("../../models/user");

const logOut = async (req, res) => {
    const { _id } = req.user;

    await User.findByIdAndUpdate(_id, { token: null });

    res.status(NO_CONTENT).json();
};

module.exports = logOut;
