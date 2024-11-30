const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const db = require("../../models");
const config = require("../../config/config");

// Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.EMAIL,
    pass: config.EMAIL_PASSWORD,
  },
});

// Sign up
const signupController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Create user
    const newUser = await db.User.create({
      email,
      password: hashedPassword,
      verificationToken,
      isVerified: false,
    });

    // Send verification email
    const mailOptions = {
      from: config.EMAIL,
      to: newUser.email,
      subject: "Email Verification",
      text: `Please verify you email by clicking the following link: ${config.BASE_URL}/verify-email?token=${verificationToken}`,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error("Email Error:", error);
        await db.EmailErrorLog.create({ userId: newUser.id, error });
        return res.status(500).json({ message: "Error sending email", error });
      }
      res.status(201).json({
        message: "User created successfully. Please verify your email.",
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

module.exports = signupController;
