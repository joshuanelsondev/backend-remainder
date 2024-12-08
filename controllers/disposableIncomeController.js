const {
  calculateDisposableIncome,
} = require("../services/disposableIncomeService");

const getDisposableIncomeController = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await calculateDisposableIncome(userId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDisposableIncomeController,
};
