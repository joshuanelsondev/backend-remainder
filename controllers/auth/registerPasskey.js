const { server } = require("@passwordless-id/webauthn");
const db = require("../../models");

const registerPasskey = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const options = await server.generateRegistrationOptions({
      user: {
        id: user.id,
        email: user.email,
        name: user.email,
      },
      authenticatorSelection: {
        authenticatorAttachment: "platform",
        requireResidentKey: false,
        userVerification: "required",
      },
      attestation: "none",
    });

    user.challenge = options.challenge;
    await user.save();

    res.status(200).json(options);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error generating registration options", error });
  }
};

module.exports = registerPasskey;
