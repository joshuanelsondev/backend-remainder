const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Development-only route for generating admin token
router.get("/generate-admin-token", (req, res) => {
  if (process.env.NODE_ENV !== "development") {
    return res
      .status(403)
      .json({ message: "This route is only available in development mode." });
  }

  // Admin user payload
  const adminPayload = {
    id: "c9d19c8a-48c4-4a7b-8d8d-123456789def",
    email: "admin@example.com",
    isAdmin: true,
  };

  // Sign the token
  const token = jwt.sign(adminPayload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});

module.exports = router;
