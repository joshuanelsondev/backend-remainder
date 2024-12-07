const { server } = require('@passwordless-id/webauthn');
const db = require('../../models');
const validateEmail = require('../../utils/validateEmail');

const getRegistrationOptions = async (req, res) => {
  const { email } = req.query;

  try {
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const user = await db.User.findOne({ where: { email } });
    if (!user || !user.isVerified) {
      return res
        .status(400)
        .json({ message: 'User not verified or does not exist.' });
    }

    const options = await server.generateRegistrationOptions({
      user: {
        id: user.id,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
      },
      authenticatorSelection: {
        authenticatorAttachment: 'platform',
        requireResidentKey: false,
        userVerification: 'required',
      },
      attestation: 'none',
    });

    user.challenge = options.challenge;
    await user.save();

    res.status(200).json(options);
  } catch (error) {
    console.error('Error in getRegistrationOptions:', error);
    res.status(500).json({
      message: 'Error generating registration options',
      error: error.message,
    });
  }
};

module.exports = getRegistrationOptions;
