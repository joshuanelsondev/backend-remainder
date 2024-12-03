const bcrypt = require("bcryptjs");
const { generateToken } = require("../../utils/token");
const db = require("../../models");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Invalid email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: "Email not verified" });
    }

    user.lastLoginAt = new Date();
    await user.save();

    const token = generateToken({ id: user.id });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        lastLoginAt: user.lastLoginAt,
      },
    });
  } catch (error) {
    console.error("Login error: ", error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

module.exports = loginController;
