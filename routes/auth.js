const express = require("express");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/token");
const nodemailer = require("nodemailer");
const { check, validationResult } = require("express-validator");
const normalizeChallenge = require("../utils/challengeUtils");
const createRateLimiter = require("../utils/rateLimiter");
const crypto = require("crypto");
const { server } = require("@passwordless-id/webauthn");
const db = require("../models");
const config = require("../config/config");

const router = express.Router();

// Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.EMAIL,
    pass: config.EMAIL_PASSWORD,
  },
});

const signupRateLimiter = createRateLimiter(10 * 60 * 100, 3);

// Sign up
router.post(
  "/signup",
  signupRateLimiter,
  [
    check("email").isEmail().withMessage("Invalid email format"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least * characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
          return res
            .status(500)
            .json({ message: "Error sending email", error });
        }
        res.status(201).json({
          message: "User created successfully. Please verify your email.",
        });
      });
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error });
    }
  }
);

//Email Verification
router.get("/verify-email", async (req, res) => {
  try {
    const { token } = req.query;
    const user = await db.User.findOne({ where: { verificationToken: token } });

    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error verifying email", error });
  }
});

// Generate Authentication Options
router.post("/generate-authentication-options", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const options = await server.generateAuthenticationOptions({
      challenge: crypto.randomBytes(32).toString("base64url"),
      allowCredentials: [
        {
          id: user.webauthnid,
          type: "public-key",
        },
      ],
      userVerification: "preferred",
    });

    user.challenge = options.challenge;
    await user.save();

    res.status(200).json(options);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error generating authentication options", error });
  }
});

// Verify Authentication
router.post("/verify-passkey", async (req, res) => {
  try {
    const { credential, email } = req.body;
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Format expected challenge
    const normalizedChallenge = normalizeChallenge(user.challenge);

    const verification = await server.verifyAuthenticationResponse({
      response: credential,
      normalizedChallenge,
      expectedOrigin: config.EXPECTED_ORIGIN,
      expectedRPID: config.EXPECTED_RPID,
      userVerification: "required",
      counter: user.authCounter,
    });

    if (verification.verified) {
      user.authCounter = verification.authenticationInfo.counter;
      await user.save();

      const token = generateToken({ id: user.id });

      res.status(200).json({ message: "Login successful", token });
    } else {
      res.status(400).json({ message: "Invalid authentication response" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error verifying passkey", error });
  }
});

// Register Passkey
router.post("/register/passkey", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const options = await webAuthn.generateRegistrationOptions({
      user: {
        id: user.id,
        email: user.email,
        name: user.email,
      },
      authenticatorSelection: {
        authenticatorAttachment: "platform",
        requireResidentKey: false,
        userVerification: "required",
      },
      attestation: "none",
    });

    user.challenge = options.challenge;
    await user.save();

    res.status(200).json(options);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error generating registration options", error });
  }
});

// Verify Registration
router.post("/verify-registration", async (req, res) => {
  try {
    const { credential, email } = req.body;
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const normalizedChallenge = normalizeChallenge(user.challenge);

    const verification = await server.verifyRegistrationResponse({
      response: credential,
      normalizedChallenge,
      expectedOrigin: config.EXPECTED_ORIGIN,
      expectedRPID: config.EXPECTED_RPID,
    });

    if (verification.verified) {
      user.webauthnid = verification.registrationInfo.credentialID;
      user.webauthnpublickey =
        verification.registrationInfo.credentialPublicKey;
      user.authCounter = verification.registrationInfo.Counter;
      user.challenge = null;
      await user.save();

      res.status(200).json({ message: "Passkey registered successfully" });
    } else {
      res.status(400).json({ message: "Invalid registration response" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error verifying registration", error });
  }
});

const loginRateLimiter = createRateLimiter(15 * 60 * 1000, 5);

// Login
router.post("/login", loginRateLimiter, async (req, res) => {
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
    const token = generateToken({ id: user.id });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

module.exports = router;
