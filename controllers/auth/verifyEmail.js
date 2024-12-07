const { verifyToken } = require('../../utils/token');
const process = require('process');
const db = require('../../models');

const verifyEmailController = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = verifyToken(token);

    const user = await db.User.findOne({ where: { id: decoded.id } });

    if (!user) {
      return res.status(404).send('User not found');
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.redirect(`${process.env.FRONTEND_URL}/mfa-setup?email=${user.email}`);
  } catch (error) {
    console.error('Error verifying email:', error);
    res.redirect(`${process.env.FRONTEND_URL}/verification-failed`);
  }
};

module.exports = verifyEmailController;
