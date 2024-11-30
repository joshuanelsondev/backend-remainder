const rateLimit = require("express-rate-limit");

const createRateLimiter = (
  windowMs,
  maxRequests,
  message = "Too many attempts, please try again later."
) => {
  return rateLimit({
    windowMs,
    max: maxRequests,
    message,
    standardHeaders: true,
    legacyHeaders: false,
  });
};

module.exports = createRateLimiter;
