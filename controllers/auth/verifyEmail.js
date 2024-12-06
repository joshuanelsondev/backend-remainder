const { verifyToken } = require("../../utils/token");
const process = require("process");
const db = require("../../models");

const verifyEmailController = async (req, res) => {
  const { token } = req.params;
  console.log("Token received:", token);

  try {
    const decoded = verifyToken(token);
    console.log("Decoded token:", decoded);

    const user = await db.User.findOne({ where: { id: decoded.id } });

    if (!user) {
      return res.status(404).send("User not found");
    }

    user.isVerified = true;
    await user.save();

    res.redirect(`${process.env.FRONTEND_URL}/verification-success`);
  } catch (error) {
    console.error(error);
    res.redirect(`${process.env.FRONTEND_URL}/verification-failed`);
  }
};

module.exports = verifyEmailController;
