const express = require("express");

// Controllers
const signupController = require("../controllers/auth/signup");
const loginController = require("../controllers/auth/login");
const verifyEmailController = require("../controllers/auth/verifyEmail");
const verifyRegistrationController = require("../controllers/auth/verifyRegistration");
const generateAuthOptionsController = require("../controllers/auth/generateAuthOptions");
const getRegistrationOptionsController = require("../controllers/auth/getRegistrationOptions");
const registerOptionsController = require("../controllers/auth/registerOptions");
const registerController = require("../controllers/auth/register");
const validateLogin = require("../utils/validateLogin");

// Middleware and utils
const createRateLimiter = require("../utils/rateLimiter");
const validateSignup = require("../utils/validateSignup");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Rate limiters for specific routes
const signupRateLimiter = createRateLimiter(15 * 60 * 1000, 5);
const loginRateLimiter = createRateLimiter(15 * 60 * 1000, 10);

// Routes
router.post("/signup", signupRateLimiter, validateSignup, signupController);
router.post("/login", loginRateLimiter, validateLogin, loginController);
router.get("/verify/:token", verifyEmailController);

router.post(
  "/generate-auth-options",
  authMiddleware,
  generateAuthOptionsController
);
router.post("/verify-registration", verifyRegistrationController);
router.get("/get-registration-options", getRegistrationOptionsController);

router.post("/register-options", registerOptionsController);
router.post("/register", registerController);

module.exports = router;
