const express = require("express");
const user = express.Router();
const {
  getUserController,
  updateUserController,
  deleteUserController,
} = require("../controllers/userController");

user.get("/:id", getUserController);
user.put("/:id", updateUserController);
user.delete("/:id", deleteUserController);

module.exports = user;
