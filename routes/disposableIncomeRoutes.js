const express = require("express");
const disposableIncome = express.Router();
const {
  getBudgetController,
} = require("../controllers/disposableIncomeController");

disposableIncome.get("/", getBudgetController);

module.exports = disposableIncome;
