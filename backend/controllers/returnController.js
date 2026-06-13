const Return = require("../models/Return");
const Item = require("../models/Item");
const User = require("../models/User");
const CreditTransaction = require("../models/CreditTransaction");

const calculateGreenCredits = (
  conditionGrade,
  disposition,
  itemValue
) => {

  let gradeScore = 0;
  let dispositionBonus = 0;
  let itemValueBonus = 0;

  // Grade Score
  if (conditionGrade === "A") {
    gradeScore = 50;
  }
  else if (conditionGrade === "B") {
    gradeScore = 30;
  }
  else {
    gradeScore = 10;
  }

  // Disposition Bonus
  if (disposition === "Resell") {
    dispositionBonus = 40;
  }
  else if (disposition === "Refurbish") {
    dispositionBonus = 25;
  }
  else {
    dispositionBonus = 10;
  }

  // Item Value Bonus
  if (itemValue > 50000) {
    itemValueBonus = 30;
  }
  else if (itemValue >= 10000) {
    itemValueBonus = 20;
  }
  else {
    itemValueBonus = 10;
  }

  return gradeScore + dispositionBonus + itemValueBonus;
};

// Create Return
const createReturn = async (req, res) => {

  try {

    const {
      userId,
      itemId,
      reason,
      conditionGrade,
      co2Saved
    } = req.body;

    let disposition;

    if (conditionGrade === "A") {
      disposition = "Resell";
    }
    else if (conditionGrade === "B") {
      disposition = "Refurbish";
    }
    else {
      disposition = "Recycle";
    }

    const item = await Item.findById(itemId);

    if (!item) {

      return res.status(404).json({
        message: "Item not found"
      });

    }

    const creditsEarned = calculateGreenCredits(
      conditionGrade,
      disposition,
      item.originalPrice
    );

    const user = await User.findById(userId);

    if (user) {

      user.greenCredits += creditsEarned;

      await user.save();

    }

    await CreditTransaction.create({
      userId,
      amount: creditsEarned,
      type: "ADD"
    });

    const returnedItem = await Return.create({
      userId,
      itemId,
      reason,
      conditionGrade,
      disposition,
      co2Saved
    });

    res.status(201).json({
      returnedItem,
      creditsEarned
    });

  }
  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// Get Return Status
const getReturnStatus = async (req, res) => {

  try {

    const returnItem = await Return.findById(req.params.id);

    if (!returnItem) {

      return res.status(404).json({
        message: "Return not found"
      });

    }

    res.json(returnItem);

  }
  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  createReturn,
  getReturnStatus
};