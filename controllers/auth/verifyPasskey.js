const { server } = require("@passwordless-id/webauthn");
const db = require("../../models");
const config = require("../../config/config");
const normalizeChallenge = require("../../utils/challengeUtils");
const { generateToken } = require("../../utils/token");

const verifyPasskey = async (req, res) => {
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
};

module.exports = verifyPasskey;
