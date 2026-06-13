const express = require("express");

const router = express.Router();

const {
  getCredits,
  redeemCredits,
  getCreditHistory
} = require("../controllers/creditController");

router.get("/history/:userId", getCreditHistory);

router.get("/:userId", getCredits);

router.post("/redeem", redeemCredits);

module.exports = router;