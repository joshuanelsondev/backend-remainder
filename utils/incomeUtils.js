const { Income, Expense, DisposableIncome } = require("../models");

async function calculateForUser(userId) {
  const totalIncomeResult = await Income.sum("amount", { where: { userId } });
  const totalIncome = totalIncomeResult || 0;

  const totalExpensesResult = await Expense.sum("amount", {
    where: { userId },
  });
  const totalExpenses = totalExpensesResult || 0;

  const disposableIncome = totalIncome - totalExpenses;

  const [record] = await DisposableIncome.findOrCreate({
    where: { userId },
    defaults: {
      totalIncome,
      totalExpenses,
      disposableIncome,
      calculatedAt: new Date(),
    },
  });

  if (!record.isNewRecord) {
    record.totalIncome = totalIncome;
    record.totalExpenses = totalExpenses;
    record.disposableIncome = disposableIncome;
    record.calculatedAt = new Date();
    await record.save();
  }

  return record;
}

module.exports = { calculateForUser };
