const { Income, Expense, Budget } = require("../models");
const crypto = require("crypto");

const calculateTotalIncome = async (userId) => {
  return (await Income.sum("amount", { where: { userId } })) || 0;
};

const calculateTotalExpenses = async (userId) => {
  return (await Expense.sum("amount", { where: { userId } })) || 0;
};

const calculateIncomeSources = async (userId) => {
  return await Income.count({
    where: { userId },
    distinct: true,
    col: "source",
  });
};

const calculateExpenseSources = async (userId) => {
  return await Expense.count({
    where: { userId },
    distinct: true,
    col: "category",
  });
};

const calculateIncomeTransactions = async (userId) => {
  return await Income.count({ where: { userId } });
};

const calculateExpenseTransactions = async (userId) => {
  return await Expense.count({ where: { userId } });
};

// Create calculate hash for budgetData comparison
const calculateHash = (data) => {
  return crypto.createHash("sha256").update(JSON.stringify(data)).digest("hex");
};

// Main function to calculate and update the budget
const calculateBudget = async (userId) => {
  const [
    totalIncome,
    totalExpenses,
    incomeSources,
    expenseSources,
    incomeTransactions,
    expenseTransactions,
  ] = await Promise.all([
    calculateTotalIncome(userId),
    calculateTotalExpenses(userId),
    calculateIncomeSources(userId),
    calculateExpenseSources(userId),
    calculateIncomeTransactions(userId),
    calculateExpenseTransactions(userId),
  ]);

  // Calculate totals
  const totalSources = incomeSources + expenseSources;
  const totalTransactions = incomeTransactions + expenseTransactions;
  const budget = totalIncome - totalExpenses;

  const newBudgetData = {
    userId,
    totalIncome,
    totalExpenses,
    budget,
    incomeSources,
    expenseSources,
    totalSources,
    incomeTransactions,
    expenseTransactions,
    totalTransactions,
    calculatedAt: new Date(),
  };

  const existingBudget = await Budget.findOne({ where: { userId } });

  if (existingBudget) {
    const normalizedExistingBudget = {
      userId: existingBudget.userId,
      totalIncome: parseFloat(existingBudget.totalIncome),
      totalExpenses: parseFloat(existingBudget.totalExpenses),
      budget: parseFloat(existingBudget.budget),
      incomeSources: existingBudget.incomeSources,
      expenseSources: existingBudget.expenseSources,
      totalSources: existingBudget.totalSources,
      incomeTransactions: existingBudget.incomeTransactions,
      expenseTransactions: existingBudget.expenseTransactions,
      totalTransactions:
        existingBudget.incomeTransactions + existingBudget.expenseTransactions,
      calculatedAt: new Date(existingBudget.calculatedAt),
    };

    // Compare normalized objects, ignoring calculatedAt
    const isEqual =
      JSON.stringify({
        ...normalizedExistingBudget,
        calculatedAt: undefined,
      }) === JSON.stringify({ ...newBudgetData, calculatedAt: undefined });

    if (isEqual) {
      return normalizedExistingBudget;
    }
  }

  const result = await Budget.upsert(newBudgetData);
  console.log("Budget record updated.");
  return result[0];
};

module.exports = {
  calculateBudget,
};
