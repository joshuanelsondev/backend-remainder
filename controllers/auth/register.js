const { server } = require("@passwordless-id/webauthn");
const db = require("../../models");

const registerController = async (req, res) => {
  const { registration, email } = req.body;

  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const verification = await server.verifyRegistration(registration, {
      challenge: user.challenge,
      origin: process.env.EXPECTED_ORIGIN,
    });

    if (verification.userVerified) {
      user.webauthnid = verification.credential.id;
      user.webauthnpublickey = verification.credential.publicKey;
      user.challenge = null;
      await user.save();

      return res.status(200).json({ message: "Registration successful" });
    } else {
      return res
        .status(400)
        .json({ message: "Verification failed", details: verification });
    }
  } catch (error) {
    console.error("Verification Error: Full Stack Trace:", error);
    return res
      .status(500)
      .json({ message: "Server error during verification", error });
  }
};

module.exports = registerController;
