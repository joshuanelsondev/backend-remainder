const express = require("express");
const user = express.Router();
const authenticateUser = require("../middleware/authenticateUser");
const authorizeAdmin = require("../middleware/authorizeAdmin");
const {
  getUserController,
  updateUserController,
  deleteUserController,
} = require("../controllers/userController");

// Current user routes
user.get("/me", authenticateUser, getUserController);
user.patch("/me", authenticateUser, updateUserController);
user.delete("/me", authenticateUser, deleteUserController);

// Admin-only routes
user.get("/:id", authorizeAdmin, getUserController);
user.delete("/:id", authorizeAdmin, deleteUserController);

module.exports = user;
