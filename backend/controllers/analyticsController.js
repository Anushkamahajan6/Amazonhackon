const Return = require("../models/Return");
const Item = require("../models/Item");
const User = require("../models/User");

// Basic Analytics
const getAnalytics = async (req, res) => {
  try {

    const totalReturns = await Return.countDocuments();

    const totalItems = await Item.countDocuments();

    const totalUsers = await User.countDocuments();

    const users = await User.find();

    let totalCreditsIssued = 0;

    users.forEach(user => {
      totalCreditsIssued += user.greenCredits;
    });

    res.json({
      totalReturns,
      totalItems,
      totalUsers,
      totalCreditsIssued
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// Chart Analytics
const getChartData = async (req, res) => {

  try {

    const returns = await Return.find();

    let totalCO2Saved = 0;

    let resellCount = 0;
    let refurbishCount = 0;
    let recycleCount = 0;

    returns.forEach(item => {

      totalCO2Saved += item.co2Saved || 0;

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