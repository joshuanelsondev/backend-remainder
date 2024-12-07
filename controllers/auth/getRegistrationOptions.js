const crypto = require("crypto");
const db = require("../../models");
const validateEmail = require("../../utils/validateEmail");

const getRegistrationOptionsController = async (req, res) => {
  const { email } = req.query;
  console.log("EMAIL:", email);

  try {
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await db.User.findOne({ where: { email } });
    if (!user || !user.isVerified) {
      return res
        .status(400)
        .json({ message: "User not verified or does not exist." });
    }

    const challenge = crypto.randomBytes(32).toString("base64url");

    const options = {
      challenge,
      rp: {
        name: "Remainder",
        id: process.env.RP_ID || "remainderinvest.netlify.app",
      },
      user: {
        id: Buffer.from(user.id).toString("base64url"),
        name: user.email,
        displayName: `${user.firstName} ${user.lastName}`,
      },
      pubKeyCredParams: [{ alg: -7, type: "public-key" }],
      authenticatorSelection: {
        authenticatorAttachment: "platform",
        requireResidentKey: false,
        userVerification: "required",
      },
      timeout: 60000,
      attestation: "none",
    };

    user.challenge = options.challenge;
    await user.save();

    res.status(200).json(options);
  } catch (error) {
    console.error("Error in getRegistrationOptions:", error);
    res.status(500).json({
      message: "Error generating registration options",
      error: error.message,
    });
  }
};

module.exports = getRegistrationOptionsController;
