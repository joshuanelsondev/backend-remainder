const { Income, Expense, Budget } = require("../models");

const calculateBudget = async (userId) => {
  const totalIncome = await Income.sum("amount", {
    where: { userId },
  });

  const totalExpenses = await Expense.sum("amount", {
    where: { userId },
  });

  const budget = (totalIncome || 0) - (totalExpenses || 0);

  const result = await Budget.create({
    userId,
    totalIncome: totalIncome || 0,
    totalExpenses: totalExpenses || 0,
    budget,
  });

  return result;
};

module.exports = {
  calculateBudget,
};
