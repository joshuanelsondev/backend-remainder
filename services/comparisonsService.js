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
          db.Sequelize.fn("DATE_FORMAT", db.Sequelize.col("date"), "%Y-%m"),
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
          db.Sequelize.fn("DATE_FORMAT", db.Sequelize.col("date"), "%Y-%m"),
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

module.exports = { getMonthlyComparisons };
