const express = require("express");
const budget = express.Router();
const { getBudgetController } = require("../controllers/budgetController");

budget.get("/", getBudgetController);

module.exports = budget;
