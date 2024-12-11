const { server } = require("@passwordless-id/webauthn");
const db = require("../../models");

const authOptionsController = async (req, res) => {
  const { email } = req.body;

  const user = await db.User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const options = {
    challenge: server.generateChallenge(),
  };

  user.challenge = options.challenge;
  await user.save();

  res.status(200).json(options);
};

module.exports = authOptionsController;
