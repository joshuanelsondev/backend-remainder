const { getMonthlyComparisons } = require("../services/comparisonsService");

const getComparisons = async (req, res) => {
  const userId = req.user.id;
  const { startDate, endDate } = req.query;

  try {
    const comparisonsData = await getMonthlyComparisons(
      userId,
      startDate,
      endDate
    );
    res.status(200).json(comparisonsData);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comparisons", error });
  }
};

module.exports = { getComparisons };
