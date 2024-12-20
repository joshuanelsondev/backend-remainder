const { Income, Expense, Budget } = require("../models");

const calculateBudget = async (userId) => {
  const totalIncome = await Income.sum("amount", {
    where: { userId },
  });

  const totalExpenses = await Expense.sum("amount", {
    where: { userId },
  });

  // Calculate unique sources for incomes
  const incomeSources = await Income.count({
    where: { userId },
    distinct: true,
    col: "source",
  });

  // Calculate unique sources for expenses
  const expenseSources = await Expense.count({
    where: { userId },
    distinct: true,
    col: "source",
  });

  // Calculate total sources
  const totalSources = incomeSources + expenseSources;

  // Calculate budget
  const budget = (totalIncome || 0) - (totalExpenses || 0);

  await Budget.upsert({
    userId,
    totalIncome,
    totalExpenses,
    disposableIncome,
    incomeSources,
    expenseSources,
    totalSources,
    calculatedAt: new Date(),
  });
};

module.exports = {
  calculateBudget,
};
