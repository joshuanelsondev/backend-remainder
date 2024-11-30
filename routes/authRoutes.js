const express = require("express");

// Import controllers
const signupController = require("../controllers/auth/signup");
const loginController = require("../controllers/auth/login");
const verifyEmailController = require("../controllers/auth/verifyEmail");
const registerPasskeyController = require("../controllers/auth/registerPasskey");
const verifyRegistrationController = require("../controllers/auth/verifyRegistration");

// Import middleware and utils
const createRateLimiter = require("../utils/rateLimiter");
const { validateSignup } = require("../utils/validation");
const { authMiddleware } = require("../utils/auth");

// Apply rate limiters for specific routes
const signupRateLimiter = createRateLimiter(15 * 60 * 1000, 5);
const loginRateLimiter = createRateLimiter(15 * 60 * 1000, 10);

const router = express.Router();

module.exports = router;
