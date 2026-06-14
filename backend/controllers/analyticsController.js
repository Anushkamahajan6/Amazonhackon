const Return = require("../models/Return");
const Item = require("../models/Item");
const User = require("../models/User");
const MarketplaceListing = require("../models/MarketplaceListing");

// Basic Analytics — all KPIs needed by the dashboard
const getAnalytics = async (req, res) => {
  try {

    const totalReturns = await Return.countDocuments();
    const totalItems   = await Item.countDocuments();
    const totalUsers   = await User.countDocuments();

    // Green Credits = sum of all users' greenCredits
    const users = await User.find();
    let totalCreditsIssued = 0;
    users.forEach(u => { totalCreditsIssued += u.greenCredits; });

    // Pending Reviews = Refurbish + Recycle dispositions need human verification
    const pendingReviews = await Return.countDocuments({
      disposition: { $in: ["Refurbish", "Recycle"] }
    });

    // Revenue Recovered = sum of all ACTIVE marketplace listing prices
    const activeListings = await MarketplaceListing.find({ status: "ACTIVE" });
    const revenueRecovered = activeListings.reduce(
      (sum, l) => sum + (l.listingPrice || 0), 0
    );

    // Total CO2 Saved across all returns
    const allReturns = await Return.find();
    let totalCO2Saved = 0;
    allReturns.forEach(r => { totalCO2Saved += r.co2Saved || 0; });

    res.json({
      totalReturns,
      totalItems,
      totalUsers,
      totalCreditsIssued,
      pendingReviews,
      revenueRecovered,
      totalCO2Saved
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Chart Analytics — disposition breakdown for pie chart
const getChartData = async (req, res) => {
  try {

    const returns = await Return.find();

    let totalCO2Saved = 0;
    let recoveredRevenue = 0;

    let resellCount = 0;
    let refurbishCount = 0;
    let recycleCount = 0;

    returns.forEach(item => {

      totalCO2Saved += item.co2Saved || 0;

      recoveredRevenue +=
        item.suggestedResalePrice || 0;

      if (item.disposition === "Resell") {
        resellCount++;
      }

      else if (item.disposition === "Refurbish") {
        refurbishCount++;
      }

      else if (item.disposition === "Recycle") {
        recycleCount++;
      }

    });

    res.json({

      totalReturns: returns.length,

      totalCO2Saved,

      recoveredRevenue,

      dispositionStats: {

        Resell: resellCount,

        Refurbish: refurbishCount,

        Recycle: recycleCount

      }

    });

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
module.exports = {
  getAnalytics,
  getChartData
};