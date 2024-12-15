const express = require("express");
const user = express.Router();
const authenticateUser = require("../middleware");
const {
  getUserController,
  updateUserController,
  deleteUserController,
} = require("../controllers/userController");

// Current user routes
user.get("/me", authenticateUser, getUserController);
user.patch("/me", authenticateUser, updateCurrentUserController);
user.delete("/me", authenticateUser, deleteCurrentUserController);

// Admin-only routes
user.get("/:id", authenticateUser, authorizeAdmin, getUserController);
user.delete(
  "/:id",
  authenticateUser,
  authorizeAdmin,
  deleteCurrentUserController
);

module.exports = user;
