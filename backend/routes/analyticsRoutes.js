const express = require("express");

const router = express.Router();

const { getAnalytics, getChartData } = require("../controllers/analyticsController");
const { getTrustScores }             = require("../controllers/trustScoreController");
const { getRecentReturns }           = require("../controllers/recentReturnsController");

router.get("/charts",         getChartData);
router.get("/trust-scores",   getTrustScores);
router.get("/recent-returns", getRecentReturns);
router.get("/",               getAnalytics);

module.exports = router;