const bcrypt = require('bcryptjs');
const db = require('../../models');
const { generateToken } = require('../../utils/token');
const sendVerificationEmail = require('../../utils/sendVerificationEmail');
const { server } = require('@passwordless-id/webauthn');

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
      lastLoginAt: new Date(),
    });

    const verificationToken = generateToken({ id: newUser.id });
    newUser.verificationToken = verificationToken;

    const webAuthnOptions = await server.generateRegistrationOptions({
      user: {
        id: newUser.id,
        email: newUser.email,
        name: `${newUser.firstName} ${newUser.lastName}`,
      },
      authenticatorSelection: {
        authenticatorAttachment: 'platform',
        requireResidentKey: false,
        userVerification: 'required',
      },
      attestation: 'none',
    });

    await newUser.save();

    await sendVerificationEmail(newUser);

    res.status(201).json({
      message:
        'User created successfully. Please verify your email and complete MFA setup.',
      verificationToken,
      registrationOptions: webAuthnOptions,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

module.exports = signupController;
