const db = require("../models");
const Expense = db.Expense;

const createExpense = async (data, userId) => {
  const expenseData = { ...data, userId };
  return await Expense.create(expenseData);
};

const getExpense = async (id, userId) => {
  return await Expense.findOne({
    where: { id, userId },
  });
};

const getAllExpenses = async (userId, offset = 0, limit = 10) => {
  return await Expense.findAll({
    where: {
      userId,
      offset,
      limit,
      order: [["createdAt", "DESC"]],
    },
  });
};

const updateExpense = async (id, userId, data) => {
  const [updated] = await Expense.update(data, {
    where: { id, userId },
  });

  if (updated) {
    return await Expense.findOne({
      where: { id, userId },
    });
  }

  throw new Error("Expense not found");
};

const deleteExpense = async (id, userId) => {
  const deleted = await Expense.destroy({
    where: { id, userId },
  });

  if (deleted) {
    return true;
  }

  throw new Error("Expense not found");
};

module.exports = {
  createExpense,
  getExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense,
};
