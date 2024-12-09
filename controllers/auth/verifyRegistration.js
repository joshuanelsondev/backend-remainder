const { server } = require("@passwordless-id/webauthn");
const db = require("../../models");
const config = require("../../config/config");
const normalizeChallenge = require("../../utils/challengeUtils");

const verifyRegistration = async (req, res) => {
  const { credential, email } = req.body;
  const user = await db.User.findOne({ where: { email } });
  try {
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const normalizedChallenge = normalizeChallenge(user.challenge);

    const verification = await server.verifyRegistration({
      response: credential,
      expectedChallenge: normalizedChallenge,
      expectedOrigin: process.env.EXPECTED_ORIGIN,
      expectedRPID: process.env.EXPECTED_RPID,
    });

    if (!verification.verified) {
      console.error("Verification failed:", verification.error);
      return res.status(400).json({ message: "Invalid registration response" });
    }

    user.webauthnid = verification.credential.id;
    user.webauthnpublickey = verification.credential.publicKey;
    user.authCounter = verification.authenticator.counter;
    user.challenge = null;
    user.mfaEnabled = true;
    await user.save();

    res
      .status(200)
      .json({ message: "MFA registration completed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error verifying registration", error });
  }
};

module.exports = verifyRegistration;
