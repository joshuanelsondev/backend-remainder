const { server } = require("@passwordless-id/webauthn");
const db = require("../../models");

const registerController = async (req, res) => {
  const { registration, email } = req.body;

  try {
    console.log("Request body:", req.body);
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const verification = await server.verifyRegistration(registration, {
      challenge: user.challenge,
      origin: process.env.EXPECTED_ORIGIN,
      rpID: process.env.EXPECTED_RPID,
      allowNoCounter: true,
    });

    console.log("Verification Result:", JSON.stringify(verification, null, 2));

    if (verification.verified) {
      console.log("Registration verified successfully!");

      user.webauthnid = verification.registrationInfo.credentialID;
      user.webauthnpublickey =
        verification.registrationInfo.credentialPublicKey;
      user.challenge = null;
      await user.save();

      return res.status(200).json({ message: "Registration successful" });
    } else {
      console.error("Verification failed: Details:", verification);
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
