const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const db = require('../../models');
const sendVerificationEmail = require('../../utils/sendVerificationEmail');

const signupController = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const newUser = await db.User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verificationToken,
      isVerified: false,
      lastLoginAt: new Date(),
    });

    await sendVerificationEmail(newUser);

    res.status(201).json({
      message: 'User created successfully. Please verify your email.',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

module.exports = signupController;
