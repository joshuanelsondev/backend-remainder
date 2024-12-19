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
expense.get("/", getAllExpensesController);
expense.get("/:id", getExpenseController);
expense.put("/:id", updateExpenseController);
expense.delete("/:id", deleteExpenseController);

module.exports = expense;
