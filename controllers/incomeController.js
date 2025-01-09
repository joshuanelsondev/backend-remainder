const { calculateBudget } = require("../services/budgetService");
const {
  createIncome,
  getIncome,
  getAllIncomes,
  updateIncome,
  deleteIncome,
} = require("../services/incomeService");

const createIncomeController = async (req, res) => {
  const userId = req.user.id;
  const incomeData = req.body;

  try {
    const income = await createIncome(incomeData, userId);
    await calculateBudget(userId);
    return res.status(201).json(income);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getIncomeController = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const income = await getIncome(id, userId);
    if (!income) {
      return res.status(404).json({ error: "Income not found" });
    }
    return res.status(200).json(income);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllIncomesController = async (req, res) => {
  const userId = req.user.id;
  const { offset = 0, limit = 10 } = req.query;

  try {
    const { incomes, total } = await getAllIncomes(
      userId,
      parseInt(offset, 10),
      parseInt(limit, 10)
    );
    return res.status(200).json({ incomes, total });
  } catch (error) {
    console.error("Error fetching incomes:", error.message);
    return res.status(500).json({ error: "Failed to fetch incomes" });
  }
};

const updateIncomeController = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const incomeData = req.body;

  try {
    const income = await updateIncome(id, userId, incomeData);
    await calculateBudget(userId);
    return res.status(200).json(income);
  } catch (error) {
    if (error.message === "Income not found") {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

const deleteIncomeController = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    await deleteIncome(id, userId);
    await calculateBudget(userId);
    return res.status(204).send();
  } catch (error) {
    if (error.message === "Income not found") {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createIncomeController,
  getIncomeController,
  getAllIncomesController,
  updateIncomeController,
  deleteIncomeController,
};
