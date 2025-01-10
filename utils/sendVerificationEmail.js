const nodemailer = require("nodemailer");
const db = require("../models");
const process = require("process");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendVerificationEmail = async (user) => {
  const { verificationToken } = user;

  if (!verificationToken) {
    throw new Error("Verification token is missing for the user");
  }

  const verificationLink = `${process.env.BACKEND_URL}/auth/verify/${verificationToken}`;

  const mailOptions = {
    from: `"The Remainder Team" <no-reply@remainderinvest.netlify.app>`,
    to: user.email,
    subject: "Verify Your Email - Remainder",
    text: `Hi ${user.firstName},\n\nThank you for signing up for Remainder! Please verify your email to activate your account.\n\nClick the link below to verify your email:\n${verificationLink}\n\nIf you didn’t sign up for Remainder, you can safely ignore this email.\n\nBest regards,\nThe Remainder Team`,
    html: `
    <p>Hi <strong>${user.firstName}</strong>,</p>
    <p>Thank you for signing up for <strong>Remainder</strong>! Please verify your email to activate your account.</p>
    <p><a href="${verificationLink}" style="color: #1a73e8; text-decoration: none; font-weight: bold;">Click here to verify your email</a></p>
    <p>If the link doesn’t work, copy and paste this URL into your browser:</p>
    <p><a href="${verificationLink}" style="color: #1a73e8;">${verificationLink}</a></p>
    <p>If you didn’t sign up for Remainder, you can safely ignore this email.</p>
    <p>Best regards,<br>The Remainder Team</p>
  `,
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
