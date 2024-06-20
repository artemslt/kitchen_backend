const { SUCCESS } = require("../../constants/statusCode");
const AccountInfo = require("../../models/accountInfo");

const getInfo = async (req, res) => {
    const accountInfo = await AccountInfo.find({});

    res.status(SUCCESS).json({
        success: true,
        data: accountInfo,
    });
};

module.exports = getInfo;
