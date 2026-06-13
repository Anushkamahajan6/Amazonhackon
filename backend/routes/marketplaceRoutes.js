const express = require("express");

const router = express.Router();

const {
  getMarketplaceItems
} = require("../controllers/marketplaceController");

router.get("/", getMarketplaceItems);

module.exports = router;