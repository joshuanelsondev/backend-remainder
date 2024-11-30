const { verifyToken } = require("../utils/token");

// Middleware to verify JWT tokens
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = verifyToken;
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Invalid token:", error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
