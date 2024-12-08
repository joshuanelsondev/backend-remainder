const express = require("express");
const income = express.Router();
const {
  createIncomeController,
  getIncomeController,
  getAllIncomesController,
  updateIncomeController,
  deleteIncomeController,
} = require("../controllers/incomeController");

income.post("/", createIncomeController);
income.get("/:id", getIncomeController);
income.get("/", getAllIncomesController);
income.put("/:id", updateIncomeController);
income.get("/:id", deleteIncomeController);

module.exports = income;
