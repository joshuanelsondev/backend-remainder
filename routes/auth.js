const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { WebAuthn } = require("@passwordless-id/webauthn");
const db = require("../models");
const config = require("../config");

const router = express.Router();

// Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.EMAIL,
    pass: config.EMAIL_PASSWORD,
  },
});

// Initialize WebAuthn
const webAuthn = new WebAuthn({
  origin: config.EXPECTED_ORIGIN,
  rpID: config.EXPECTED_RPID,
  challengeTimeoutMS: 60000,
  userTimeoutMS: 60000,
});

// Sign up
router.post("/signup", async (req, res) => {
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
      subject: "Emial Verification",
      text: `Please verify you email by clicking the following link: ${config.BASE_URL}/verify-email?token=${verificationToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: "Error sending email", error });
      }
      res
        .status(201)
        .json({
          message: "User created successfully. Please verify your email.",
        });
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

module.exports = router;
