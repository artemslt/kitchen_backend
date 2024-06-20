const nodemailer = require("nodemailer");

const { EMAIL_SENDER, EMAIL_SENDER_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: EMAIL_SENDER,
        pass: EMAIL_SENDER_PASSWORD,
    },
});

const sendEmail = async (mailDetails, callback) => {
    try {
        const info = await transporter.sendMail(mailDetails);
        callback(info);
    } catch (error) {
        console.log(error);
    }
};

module.exports = sendEmail;
