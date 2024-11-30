const { server } = require("@passwordless-id/webauthn");
const db = require("../../models");
const config = require("../../config");
const normalizeChallenge = require("../../utils/challengeUtils");

const verifyRegistration = async (req, res) => {
  const { credential, email } = req.body;
  try {
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
};

module.exports = verifyRegistration;
