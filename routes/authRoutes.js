const express = require("express");

// Import controllers
const signupController = require("../controllers/auth/signup");
const loginController = require("../controllers/auth/login");
const verifyEmailController = require("../controllers/auth/verifyEmail");
const registerPasskeyController = require("../controllers/auth/registerPasskey");
const verifyRegistrationController = require("../controllers/auth/verifyRegistration");
const generateAuthOptionsController = require("../controllers/auth/generateAuthOptions");
const verifyPasskeyController = require("../controllers/auth/verifyPasskey");
const validateLogin = require("../utils/validateLogin");

// Import middleware and utils
const createRateLimiter = require("../utils/rateLimiter");
const validateSignup = require("../utils/validateSignup");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Apply rate limiters for specific routes
const signupRateLimiter = createRateLimiter(15 * 60 * 1000, 5);
const loginRateLimiter = createRateLimiter(15 * 60 * 1000, 10);

// Routes
router.post("/signup", signupRateLimiter, validateSignup, signupController);
router.post("/login", loginRateLimiter, validateLogin, loginController);
router.post("/register-passkey", registerPasskeyController);
router.post("/verify-registration", verifyRegistrationController);
router.get("/verify-email", verifyEmailController);

// Authentication Routes
router.post(
  "/generate-auth-options",
  authMiddleware,
  generateAuthOptionsController
);
router.post("/verify-passkey", authMiddleware, verifyPasskeyController);

module.exports = router;
