const { server } = require("@passwordless-id/webauthn");
const db = require("../../models");
const crypto = require("crypto");

const registerOptionsController = async (req, res) => {
  const { email } = req.body;

  const user = await db.User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const challenge = crypto.randomBytes(32).toString("base64url");

  const options = {
    challenge,
    user: {
      id: user.id,
      name: email,
      displayName: email,
    },
  };

  user.challenge = options.challenge;
  await user.save();

  res.status(200).json(options);
};

module.exports = registerOptionsController;
