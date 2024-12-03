const nodemailer = require("nodemailer");
const db = require("../models");
const config = require("../config/config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendVerificationEmail = async (user) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: "Email Verification",
    text: `Please verify your email by clicking the following link: ${config.BASE_URL}/auth/verify-email?token=${user.verificationToken}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully.");
  } catch (error) {
    console.error("Email Error:", error);

    if (db.EmailErrorLog) {
      await db.EmailErrorLog.create({
        userId: user.id,
        error: error.message,
      });
    }
    throw new Error("Failed to send verification email.");
  }
};

module.exports = sendVerificationEmail;
