const { server } = require("@passwordless-id/webauthn");
const db = require("../../models");

const authenticateController = async (req, res) => {
  const { authentication, email } = req.body;

  const user = await db.User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const verification = await server.verifyAuthentication(authentication, {
    challenge: user.challenge,
    origin: process.env.EXPECTED_ORIGIN,
    rpID: process.env.EXPECTED_RPID,
  });

  if (verification.verified) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.challenge = null;
    await user.save();

    res.status(200).json({ message: "Authentication successful", token });
  } else {
    res.status(400).json({ message: "Authentication failed" });
  }
};

module.exports = authenticateController;
