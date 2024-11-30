const jwt = require("jsonwebtoken");
const config = require("../config/config");

const generateToken = (payload, expiresIn = "1h") => {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn });
};

const verifyToken = (token) => {
  return jwt.verify(token, config.JWT_SECRET);
};

module.exports = {
  generateToken,
  verifyToken,
};
