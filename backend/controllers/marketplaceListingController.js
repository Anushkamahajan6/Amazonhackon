const MarketplaceListing = require("../models/MarketplaceListing");

const createListing = async (req, res) => {
  try {

    const { itemId, sellerId, grade, listingPrice } = req.body;

    let ecoBadge = "Certified Refurbished";
    if      (grade === "A") ecoBadge = "Eco Premium";
    else if (grade === "B") ecoBadge = "Eco Choice";

    const listing = await MarketplaceListing.create({
      itemId,
      sellerId,
      grade,
      listingPrice,
      ecoBadge
    });

    res.status(201).json(listing);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getListings = async (req, res) => {
  try {

    const listings = await MarketplaceListing
      .find()
      .populate("itemId")
      .populate("sellerId", "name email");

    // Return a clean flat shape so frontend never has to chase nested refs
    const result = listings.map((l) => ({
      _id:            l._id,
      grade:          l.grade          || "B",
      listingPrice:   l.listingPrice   || 0,
      ecoBadge:       l.ecoBadge,
      status:         l.status,
      createdAt:      l.createdAt,

      // Flat item fields — always present after populate
      name:           l.itemId?.name          || "Unknown Product",
      category:       l.itemId?.category      || "General",
      originalPrice:  l.itemId?.originalPrice || 0,
      // discountedPrice ≈ listingPrice (what the seller is asking)
      discountedPrice: l.listingPrice || Math.round((l.itemId?.originalPrice || 0) * 0.8),
      description:    l.itemId?.description   || "",

      // Seller info
      sellerId:   l.sellerId?._id  || null,
      sellerName: l.sellerId?.name || "Unknown Seller",
    }));

    res.json(result);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createListing,
  getListings
};