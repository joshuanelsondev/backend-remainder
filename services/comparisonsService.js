const db = require("../models");

const getMonthlyComparisons = async (userId, startDate, endDate) => {
  try {
    const incomes = await db.Income.findAll({
      where: {
        user_id: userId,
        date: {
          [db.Sequelize.Op.between]: [startDate, endDate],
        },
      },
      attributes: [
        [
          db.Sequelize.fn("TO_CHAR", db.Sequelize.col("date"), "YYYY-MM"),
          "month",
        ],
        [db.Sequelize.fn("SUM", db.Sequelize.col("amount")), "total_income"],
      ],
      group: ["month"],
      order: [[db.Sequelize.literal("month"), "ASC"]],
      raw: true,
    });

    const expenses = await db.Expense.findAll({
      where: {
        user_id: userId,
        date: {
          [db.Sequelize.Op.between]: [startDate, endDate],
        },
      },
      attributes: [
        [
          db.Sequelize.fn("TO_CHAR", db.Sequelize.col("date"), "YYYY-MM"),
          "month",
        ],
        [db.Sequelize.fn("SUM", db.Sequelize.col("amount")), "total_expenses"],
      ],
      group: ["month"],
      order: [[db.Sequelize.literal("month"), "ASC"]],
      raw: true,
    });

    // Combine incomes and expenses into a single object
    const result = {};
    incomes.forEach(({ month, total_income }) => {
      result[month] = { income: parseFloat(total_income) || 0, expenses: 0 };
    });
    expenses.forEach(({ month, total_expenses }) => {
      if (result[month]) {
        result[month].expenses = parseFloat(total_expenses) || 0;
      } else {
        result[month] = {
          income: 0,
          expenses: parseFloat(total_expenses) || 0,
        };
      }
    });

    return result;
  } catch (error) {
    console.error("Error in getMonthlyComparisons:", error);
    throw error;
  }
};

const getAvailableYears = async (userId) => {
  try {
    const incomeYears = await db.Income.findAll({
      where: { user_id: userId },
      attributes: [
        [
          db.Sequelize.fn(
            "DISTINCT",
            db.Sequelize.fn("YEAR", db.Sequelize.col("date"))
          ),
          "year",
        ],
      ],
      raw: true,
    });

    const expenseYears = await db.Expense.findAll({
      where: { user_id: userId },
      attributes: [
        [
          db.Sequelize.fn(
            "DISTINCT",
            db.Sequelize.fn("YEAR", db.Sequelize.col("date"))
          ),
          "year",
        ],
      ],
      raw: true,
    });

    // Combine and sort years
    const years = Array.from(
      new Set([
        ...incomeYears.map((y) => y.year),
        ...expenseYears.map((y) => y.year),
      ])
    ).sort();

    return years;
  } catch (error) {
    console.error("Error in getAvailableYears:", error);
    throw error;
  }
};
module.exports = { getMonthlyComparisons, getAvailableYears };
