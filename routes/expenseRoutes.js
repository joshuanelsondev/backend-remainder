const express = require("express");
const expense = express.Router();
const {
  createExpenseController,
  getExpenseController,
  getAllExpensesController,
  updateExpenseController,
  deleteExpenseController,
} = require("../controllers/expenseController");

expense.post("/", createExpenseController);
expense.get("/:id", getExpenseController);
expense.get("/", getAllExpensesController);
expense.put("/:id", updateExpenseController);
expense.get("/:id", deleteExpenseController);

module.exports = expense;
