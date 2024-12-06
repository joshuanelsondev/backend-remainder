const process = require("process");
const { verifyToken } = require("../../utils/token");
const User = require("../models/User");

const verifyTokenController = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    user.isVerified = true;
    await user.save();

    res.redirect(`${process.env.BASE_URL}/verification-success`);
  } catch (error) {
    console.error(error);
    res.redirect(`${process.env.BASE_URL}/verification-failed`);
  }
};

module.exports = verifyTokenController;
