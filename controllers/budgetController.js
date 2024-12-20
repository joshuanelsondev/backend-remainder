const { calculateBudget } = require("../services/budgetService");

const getBudgetController = async (req, res) => {
  const userId = req.user.id;

  try {
    const budget = await calculateBudget(userId);
    return res.status(200).json(budget);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getBudgetController,
};
