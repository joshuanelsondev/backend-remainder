const db = require("../models");
const DisposableIncome = db.DisposableIncome;

const createDisposableIncome = async (data) => {
  return await DisposableIncome.create(data);
};

const getDisposableIncome = async (id) => {
  return await DisposableIncome.findOne({
    where: { id },
  });
};

const getAllDisposableIncomes = async (userId) => {
  return await DisposableIncome.findAll({
    where: {
      userId,
    },
  });
};

const deleteDisposableIncome = async (id) => {
  const deleted = await DisposableIncome.destroy({
    where: { id },
  });

  if (deleted) {
    return true;
  }

  throw new Error("DisposableIncome not found");
};

module.exports = {
  createDisposableIncome,
  getDisposableIncome,
  getAllDisposableIncomes,
  deleteDisposableIncome,
};
