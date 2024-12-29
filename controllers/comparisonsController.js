const { getMonthlyComparisons } = require("../services/comparisonsService");

const getComparisons = async (req, res) => {
  const userId = req.user.id;
  const { startDate, endDate } = req.query;

  try {
    const data = await getMonthlyComparisons(userId, startDate, endDate);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comparisons", error });
  }
};

module.exports = { getComparisons };
