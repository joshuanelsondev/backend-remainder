const crypto = require("crypto");
const db = require("../../models");

const getChallengeController = async (req, res) => {
  const { email } = req.body;

  const user = await db.User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const challenge = crypto.randomBytes(32).toString("base64url");

  user.challenge = challenge;
  await user.save();

  res.status(200).json({ challenge });
};

module.exports = getChallengeController;
