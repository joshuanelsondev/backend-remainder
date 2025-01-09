const { calculateBudget } = require("../services/budgetService");
const {
  createExpense,
  getExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense,
} = require("../services/expenseService");

const createExpenseController = async (req, res) => {
  const userId = req.user.id;
  const expenseData = req.body;

  try {
    const expense = await createExpense(expenseData, userId);
    await calculateBudget(userId);
    return res.status(201).json(expense);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getExpenseController = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const expense = await getExpense(id, userId);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    return res.status(200).json(expense);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllExpensesController = async (req, res) => {
  const userId = req.user.id;
  const { offset = 0, limit = 10 } = req.query;

  try {
    const { expenses, total } = await getAllExpenses(
      userId,
      parseInt(offset),
      parseInt(limit)
    );
    return res.status(200).json({ expenses, total });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateExpenseController = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const expenseData = req.body;

  try {
    const expense = await updateExpense(id, userId, expenseData);
    await calculateBudget(userId);
    return res.status(200).json(expense);
  } catch (error) {
    if (error.message === "Expense not found") {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

const deleteExpenseController = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    await deleteExpense(id, userId);
    await calculateBudget(userId);
    return res.status(204).send();
  } catch (error) {
    if (error.message === "Expense not found") {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createExpenseController,
  getExpenseController,
  getAllExpensesController,
  updateExpenseController,
  deleteExpenseController,
};
