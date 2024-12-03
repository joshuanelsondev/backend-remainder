const db = require("../../models");
const crypto = require("crypto");
const sendVerificationEmail = require("../../utils/sendVerificationEmail");

const resendVerification = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  try {
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (user.isVerified) {
      return res.status(400).json({ error: "User is already verified." });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    user.verificationToken = verificationToken;
    await user.save();

    await sendVerificationEmail(email, verificationToken);

    res.status(200).json({ message: "Verification email sent." });
  } catch (error) {
    console.error("Error resending verification:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = resendVerification;
