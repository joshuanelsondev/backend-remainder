const db = require("../models");
const Income = db.Income;

const createIncome = async (data, userId) => {
  const incomeData = { ...data, userId };
  return await Income.create(incomeData);
};

const getIncome = async (id, userId) => {
  return await Income.findOne({
    where: { id, userId },
  });
};

const getAllIncomes = async (userId, offset = 0, limit = 10) => {
  return await Income.findAll({
    where: {
      userId,
    },
    offset,
    limit,
    order: [["createdAt", "DESC"]],
  });
};

const updateIncome = async (id, userId, data) => {
  const [updated] = await Income.update(data, {
    where: { id, userId },
  });

  if (updated) {
    return await Income.findOne({
      where: { id, userId },
    });
  }

  throw new Error("Income not found");
};

const deleteIncome = async (id, userId) => {
  const deleted = await Income.destroy({
    where: { id, userId },
  });

  if (deleted) {
    return true;
  }

  throw new Error("Income not found");
};

module.exports = {
  createIncome,
  getIncome,
  getAllIncomes,
  updateIncome,
  deleteIncome,
};
