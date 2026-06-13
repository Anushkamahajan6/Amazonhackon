const MarketplaceListing = require("../models/MarketplaceListing");

const createListing = async (req, res) => {

  try {

    const {
      itemId,
      sellerId,
      grade,
      listingPrice
    } = req.body;

    let ecoBadge = "Certified Refurbished";

    if (grade === "A") {
      ecoBadge = "Eco Premium";
    }
    else if (grade === "B") {
      ecoBadge = "Eco Choice";
    }

    const listing = await MarketplaceListing.create({
      itemId,
      sellerId,
      grade,
      listingPrice,
      ecoBadge
    });

    res.status(201).json(listing);

  }
  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const getListings = async (req, res) => {

  try {

    const listings = await MarketplaceListing
      .find()
      .populate("itemId")
      .populate("sellerId");

    res.json(listings);

  }
  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  createListing,
  getListings
};