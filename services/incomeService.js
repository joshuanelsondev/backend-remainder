const db = require("../models");
const Income = db.Income;

const createIncome = async (data) => {
  return await Income.create(data);
};

const getIncome = async (id) => {
  return await Income.findOne({
    where: { id },
  });
};

const getAllIncomes = async (userId) => {
  return await Income.findAll({
    where: {
      userId,
    },
  });
};

const updateIncome = async (id, data) => {
  const [updated] = await Income.update(data, {
    where: { id },
  });

  if (updated) {
    return await Income.findOne({
      where: { id },
    });
  }

  throw new Error("Income not found");
};

const deleteIncome = async (id) => {
  const deleted = await Income.destroy({
    where: { id },
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
