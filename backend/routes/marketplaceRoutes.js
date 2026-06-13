const express = require("express");

const router = express.Router();

const {
  getMarketplaceItems,
  getItemById
} = require("../controllers/marketplaceController");

router.get("/", getMarketplaceItems);

router.get("/:itemId", getItemById);

module.exports = router;