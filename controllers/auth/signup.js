const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const db = require("../../models");
const config = require("../../config/config");

// Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Sign up
const signupController = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Create user
    const newUser = await db.User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      verificationToken,
      isVerified: false,
      lastLoginAt: new Date(),
    });

    // Send verification email
    const mailOptions = {
      from: process.env.EMAIL,
      to: newUser.email,
      subject: "Email Verification",
      text: `Please verify your email by clicking the following link: ${config.BASE_URL}/verify-email?token=${verificationToken}`,
    };

    console.log("mailOptions: ", mailOptions, "newUser:", newUser);
    transporter.sendMail(mailOptions, async (error) => {
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
