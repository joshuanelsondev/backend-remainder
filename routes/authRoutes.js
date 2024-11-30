const express = require("express");

// Import controllers
const signupController = require("../controllers/auth/signup");
const loginController = require("../controllers/auth/login");
const verifyEmailController = require("../controllers/auth/verifyEmail");
const registerPasskeyController = require("../controllers/auth/registerPasskey");
const verifyRegistrationController = require("../controllers/auth/verifyRegistration");
const generateAuthOptionsController = require("../controllers/auth/generateAuthOptions");
const verifyPasskeyController = require("../controllers/auth/generateAuthOptions");

// Import middleware and utils
const createRateLimiter = require("../utils/rateLimiter");
const { validateSignup } = require("../utils/validation");
const { authMiddleware } = require("../utils/auth");

const router = express.Router();

// Apply rate limiters for specific routes
const signupRateLimiter = createRateLimiter(15 * 60 * 1000, 5);
const loginRateLimiter = createRateLimiter(15 * 60 * 1000, 10);

// Routes
router.post("/signup", signupRateLimiter, validateSignup, signupController);
router.post("/login", loginRateLimiter, loginController);
router.post("/register-passkey", registerPasskeyController);
router.post("/verify-registration", verifyRegistrationController);
router.post("/verify-email", verifyEmailController);

// Authentication Routes
router.post("/generate-auth-options", generateAuthOptionsController);
router.post("verify-passkey", verifyPasskeyController);

module.exports = router;