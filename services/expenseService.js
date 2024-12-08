const db = require("../models");
const Expense = db.Expense;

const createExpense = async (data) => {
  return await Expense.create(data);
};

const getExpense = async (id) => {
  return await Expense.findOne({
    where: { id },
  });
};

const getAllExpenses = async (userId) => {
  return await Expense.findAll({
    where: {
      userId,
    },
  });
};

const updateExpense = async (id, data) => {
  const [updated] = await Expense.update(data, {
    where: { id },
  });

  if (updated) {
    return await Expense.findOne({
      where: { id },
    });
  }

  throw new Error("Expense not found");
};

const deleteExpense = async (id) => {
  const deleted = await Expense.destroy({
    where: { id },
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
