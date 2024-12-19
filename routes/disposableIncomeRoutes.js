const express = require("express");
const disposableIncome = express.Router();
const {
  getDisposableIncomeController,
} = require("../controllers/disposableIncomeController");

disposableIncome.get("/", getDisposableIncomeController);

module.exports = disposableIncome;
