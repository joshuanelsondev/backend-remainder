const express = require("express");
const {
  getComparisons,
  getComparisonsYears,
} = require("../controllers/comparisonsController");
const router = express.Router();

router.get("/", getComparisons);
router.get("/years", getComparisonsYears);

module.exports = router;
