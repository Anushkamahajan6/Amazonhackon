const express = require("express");

const router = express.Router();

const {
  createListing,
  getListings
} = require("../controllers/marketplaceListingController");

router.post("/", createListing);

router.get("/", getListings);

module.exports = router;