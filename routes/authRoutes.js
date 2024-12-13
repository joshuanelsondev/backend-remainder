const express = require("express");

// Controllers
const signupController = require("../controllers/auth/signup");
const loginController = require("../controllers/auth/login");
const verifyEmailController = require("../controllers/auth/verifyEmail");
const authOptionsController = require("../controllers/auth/authenticateOptions");
const authenticateController = require("../controllers/auth/authenticate");
const getChallengeController = require("../controllers/auth/getChallenge");
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

router.post("/auth-options", authOptionsController);
router.post("/authenticate", authenticateController);

router.post("/challenge", getChallengeController);
router.post("/register", registerController);

module.exports = router;
