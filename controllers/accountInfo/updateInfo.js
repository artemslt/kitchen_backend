const { SUCCESS, NOT_FOUND } = require("../../constants/statusCode");
const AccountInfo = require("../../models/accountInfo");

const updateInfo = async (req, res) => {
    const { infoId } = req.params;
    const accountInfo = await AccountInfo.findByIdAndUpdate(infoId, req.body);

    if (!accountInfo) {
        return res.status(NOT_FOUND).json({
            success: false,
            message: "Account info does not exist",
        });
    }

    res.status(SUCCESS).json({
        success: true,
    });
};

module.exports = updateInfo;
