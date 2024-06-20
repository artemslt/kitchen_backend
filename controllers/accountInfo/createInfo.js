const { SUCCESS } = require("../../constants/statusCode");
const AccountInfo = require("../../models/accountInfo");

const createInfo = async (req, res) => {
    const accountInfo = await AccountInfo.create(req.body);

    res.status(SUCCESS).json({
        success: true,
        data: accountInfo,
    });
};

module.exports = createInfo;
