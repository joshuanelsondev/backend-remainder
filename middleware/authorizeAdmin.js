const authorizeAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    return next();
  }

  return res.status(403).json({ message: "Admin privileges required" });
};

module.exports = authorizeAdmin;
