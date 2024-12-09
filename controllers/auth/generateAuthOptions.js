const { server } = require("@passwordless-id/webauthn");
const db = require("../../models");
const crypto = require("crypto");
const validateEmail = require("../../utils/validateEmail");

const generateAuthOptions = async (req, res) => {
  try {
    const { email } = req.body;
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const challenge = crypto.randomBytes(32).toString("base64url");

    const options = {
      challenge,
      rpId: process.env.RP_ID || "remainderinvest.netlify.app",
      allowCredentials: [
        {
          id: Buffer.from(user.webauthnid, "base64"),
          type: "public-key",
        },
      ],
      userVerification: "required",
      timeout: 60000,
    };

    user.challenge = options.challenge;
    await user.save();

    res.status(200).json(options);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error generating authentication options", error });
  }
};

module.exports = generateAuthOptions;
