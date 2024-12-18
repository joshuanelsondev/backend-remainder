const { server } = require("@passwordless-id/webauthn");
const db = require("../../models");

const getChallengeController = async (req, res) => {
  const { email } = req.body;

  const user = await db.User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const challenge = server.randomChallenge();

  user.challenge = challenge;
  await user.save();

  res.status(200).json({ challenge });
};

module.exports = getChallengeController;
