const bcrypt = require("bcryptjs");
const db = require("../../models");
const { generateToken } = require("../../utils/token");
const sendVerificationEmail = require("../../utils/sendVerificationEmail");
const { server } = require("@passwordless-id/webauthn");

const signupController = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isVerified: false,
    });

    const verificationToken = generateToken({ id: newUser.id });
    newUser.verificationToken = verificationToken;
    await newUser.save();

    await sendVerificationEmail(newUser);

    res.status(201).json({
      message: "User created successfully. Please verify your email.",
    });
  } catch (error) {
    console.error("Error in signupController:", error);
    res.status(500).json({ message: "Error creating user", error });
  }
};

module.exports = signupController;
