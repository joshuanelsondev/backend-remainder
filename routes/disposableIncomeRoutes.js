const express = require("express");
const disposableIncome = express.Router();
const {
  getDisposableIncomeController,
} = require("../controllers/disposableIncomeController");

const router = express.Router();

router.get("/", getDisposableIncomeController);

module.exports = disposableIncome;
