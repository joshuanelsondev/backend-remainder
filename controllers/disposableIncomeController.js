const {
  calculateDisposableIncome,
} = require("../services/disposableIncomeService");

const getBudgetController = async (req, res) => {
  const userId = req.user.id;

  try {
    const budget = await calculateDisposableIncome(userId);
    return res.status(200).json(budget);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getBudgetController,
};
