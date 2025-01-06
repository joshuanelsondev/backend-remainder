const { server } = require("@passwordless-id/webauthn");
const db = require("../../models");
const { generateToken } = require("../../utils/token");

const authenticateController = async (req, res) => {
  const { authentication, email } = req.body;

  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.challenge) {
      return res
        .status(400)
        .json({ message: "Challenge not found or already used" });
    }

    const credentialKey = {
      id: user.webauthnid,
      publicKey: user.webauthnpublickey,
      algorithm: "ES256",
      transports: ["internal"],
    };

    const expected = {
      challenge: user.challenge,
      origin: process.env.EXPECTED_ORIGIN,
    };

    const verification = await server.verifyAuthentication(
      authentication,
      credentialKey,
      expected
    );

    if (verification.userVerified) {
      const token = generateToken({ id: user.id });

      user.challenge = null;
      if (verification.counter !== undefined) {
        user.authCounter = verification.counter;
      }

      await user.save();

      res.status(200).json({ message: "Authentication successful", token });
    }
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = authenticateController;
