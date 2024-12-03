const db = require("../../models");
const { generateToken } = require("../../utils/token");

const verifyEmailController = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Verification token is required" });
  }

  try {
    const user = await db.User.findOne({ where: { verificationToken: token } });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    const jwtToken = generateToken({ id: user.id });

    console.log(`User ${user.id} verified successfully`);

    res
      .status(200)
      .json({ message: "Email verified successfully", token: jwtToken });
  } catch (error) {
    console.error("Error verifying email: ", error);

    res.status(500).json({ message: "Error verifying email", error });
  }
};

module.exports = verifyEmailController;
