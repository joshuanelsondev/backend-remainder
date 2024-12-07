const { server } = require('@passwordless-id/webauthn');
const db = require('../../models');
const crypto = require('crypto');
const validateEmail = require('../../utils/validateEmail');

const generateAuthOptions = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const options = await server.generateAuthenticationOptions({
      challenge: crypto.randomBytes(32).toString('base64url'),
      allowCredentials: [
        {
          id: user.webauthnid,
          type: 'public-key',
        },
      ],
      userVerification: 'required',
    });

    user.challenge = options.challenge;
    await user.save();

    res.status(200).json(options);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error generating authentication options', error });
  }
};

module.exports = generateAuthOptions;
