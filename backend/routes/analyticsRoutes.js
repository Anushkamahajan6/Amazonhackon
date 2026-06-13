const express = require("express");

const router = express.Router();

const {
  getAnalytics,
  getChartData
} = require("../controllers/analyticsController");

router.get("/charts", getChartData);

router.get("/", getAnalytics);

module.exports = router;