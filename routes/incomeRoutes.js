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
income.get("/", getAllIncomesController);
income.get("/:id", getIncomeController);
income.put("/:id", updateIncomeController);
income.delete("/:id", deleteIncomeController);

module.exports = income;
