const authorizeAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    console.warn(
      `Unauthorized admin access attempt by user ID: ${req.user.id}`
    );
    return res.status(403).json({ message: "Admin privileges required" });
  }
  next();
};

module.exports = authorizeAdmin;
