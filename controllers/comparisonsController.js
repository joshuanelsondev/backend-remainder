const {
  getMonthlyComparisons,
  getAvailableYears,
} = require("../services/comparisonsService");

const getComparisons = async (req, res) => {
  const userId = req.user.id;
  const { startDate } = req.query;

  try {
    const comparisonsData = await getMonthlyComparisons(userId, startDate);
    if (!comparisonsData || Object.keys(comparisonsData).length === 0) {
      return res.status(200).json({});
    }
    res.status(200).json(comparisonsData);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comparisons", error });
  }
};

const getComparisonsYears = async (req, res) => {
  const userId = req.user.id;
  try {
    const years = await getAvailableYears(userId);
    res.status(200).json({ years: years || [] });
  } catch (error) {
    console.error("Error fetching available years:", error);
    res.status(500).json({ error: "Failed to fetch available years" });
  }
};

module.exports = { getComparisons, getComparisonsYears };
