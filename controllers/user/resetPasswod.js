const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SUCCESS, BAD_REQUEST } = require("../../constants/statusCode");
const User = require("../../models/user");
const sendEmail = require("../../helpers/sendEmail");

const { SECRET_KEY, EMAIL_SENDER } = process.env;

const resetPass = async (req, res) => {
    const { lang } = req.query;
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(BAD_REQUEST).json({
            success: false,
            message: `There is no user with email ${email}`,
        });
    }
    const token = jwt.sign({ _id: user._id }, SECRET_KEY);

    const optionsEn = {
        from: EMAIL_SENDER,
        to: email,
        subject: "Reseting your password",
        html: `
    <h2>Please click on the link below to reset your password</h2>
    <a href="https://khive.vercel.app/en/auth/resetpassword/${token}">Click here!</a>`,
    };

    const optionsUk = {
        from: EMAIL_SENDER,
        to: email,
        subject: "Оновлення паролю",
        html: `
    <h2>Будь ласка, натисніть на посилання нижче, щоб змінити свій пароль</h2>
    <a href="https://khive.vercel.app/uk/auth/resetpassword/${token}">Натисніть на посилання!</a>`,
    };

    const options = lang === "uk" ? optionsUk : optionsEn;

    sendEmail(options, info => {
        console.log("Email sent successfully");
        console.log("MESSAGE ID: ", info.messageId);
    });

    await User.findByIdAndUpdate(user._id, { token: token });

    res.status(SUCCESS).json({
        success: true,
        message: "User updated, email sent",
    });
};

module.exports = resetPass;
