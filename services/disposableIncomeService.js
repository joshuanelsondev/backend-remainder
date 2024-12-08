const { Income, Expense } = require("../models");

const calculateDisposableIncome = async (userId) => {
  const totalIncome = await Income.sum("amount", {
    where: { userId },
  });

  const totalExpenses = await Expense.sum("amount", {
    where: { userId },
  });

  const disposableIncome = (totalIncome || 0) - (totalExpenses || 0);

  const result = await DisposableIncome.create({
    userId,
    totalIncome: totalIncome || 0,
    totalExpenses: totalExpenses || 0,
    disposableIncome,
  });

  return result;
};

module.exports = {
  calculateDisposableIncome,
};
