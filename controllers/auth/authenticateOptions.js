const crypto = require("crypto");
const db = require("../../models");

const authOptionsController = async (req, res) => {
  const { email } = req.body;

  const user = await db.User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const challenge = crypto.randomBytes(32).toString("base64url");

  const allowCredentials = user.webauthnid
    ? [
        {
          id: user.webauthnid,
          transports: ["internal"],
        },
      ]
    : [];

  const options = {
    challenge,
    allowCredentials,
  };

  user.challenge = challenge;
  await user.save();

  res.status(200).json(options);
};

module.exports = authOptionsController;
