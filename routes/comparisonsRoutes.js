const express = require("express");
const { getComparisons } = require("../controllers/comparisonsController");
const router = express.Router();

router.get("/", getComparisons);

module.exports = router;
