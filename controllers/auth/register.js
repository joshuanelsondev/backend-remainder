const { server } = require("@passwordless-id/webauthn");
const db = require("../../models");

const registerController = async (req, res) => {
  const { registration, email } = req.body;

  const user = await db.User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const verification = await server.verifyRegistration(registration, {
    challenge: user.challenge,
    origin: process.env.EXPECTED_ORIGIN,
    rpID: process.env.EXPECTED_RPID,
  });

  if (verification.verified) {
    user.webauthnid = verification.registrationInfo.credentialID;
    user.webauthnpublickey = verification.registrationInfo.credentialPublicKey;
    user.challenge = null;
    await user.save();

    res.status(200).json({ message: "Registration successful" });
  } else {
    res.status(400).json({ message: "Registration failed" });
  }
};

module.exports = registerController;
