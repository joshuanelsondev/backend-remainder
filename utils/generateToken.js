const jwt = require("jsonwebtoken");
const config = require("../config/config");

const generateToken = (payload, expiresIn = "1h") => {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn });
};

module.exports = { generateToken };
