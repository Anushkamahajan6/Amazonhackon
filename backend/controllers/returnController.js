const Return = require("../models/Return");
const Item = require("../models/Item");
const User = require("../models/User");
const CreditTransaction = require("../models/CreditTransaction");
const { analyzeReturn } = require("../services/returnAIService");
const { getRecommendation } = require("../services/dispositionService");
const { getRiskScore } = require("../services/riskScoreService");

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
  reason
} = req.body;
console.log(req.file);
const image =
  req.file?.path || "";

const aiResult =
  await analyzeReturn(
    reason,
    image
  );
console.log("AI Result:", aiResult);

const {
  conditionGrade,
  conditionScore,
  damageFindings,
  disposition,
  reasoning,
  suggestedResalePrice,
  estimatedRefurbCost,
  co2Saved
} = aiResult;

const recommendation =
  getRecommendation(disposition);

  const riskScore = getRiskScore(reason);

   /* let disposition;

    if (conditionGrade === "A") {
      disposition = "Resell";
    }
    else if (conditionGrade === "B") {
      disposition = "Refurbish";
    }
    else {
      disposition = "Recycle";
    }
    */
    console.log("itemId =", itemId);
    const item = await Item.findById(itemId);
    console.log("ITEM =", item);

    if (!item) {

  console.log("Item not found, using default values");

}

    const creditsEarned = calculateGreenCredits(
      conditionGrade,
      disposition,
      item?.originalPrice || 1000
    );
    console.log("userId =", userId);
    const user = await User.findById(userId);

    if (user) {

      user.greenCredits += creditsEarned;

      await user.save();

    }
    console.log("Creating credit transaction...");
    await CreditTransaction.create({
      userId,
      amount: creditsEarned,
      type: "ADD"
    });
    console.log("Creating return document...");
    const returnedItem = await Return.create({
  userId,
  itemId,
  reason,
  image,

  conditionGrade,
  conditionScore,
  damageFindings,

  disposition,
  recommendation,
  riskScore,
  
  reasoning,

  suggestedResalePrice,
  estimatedRefurbCost,

  co2Saved,
  creditsEarned
});
    console.log("Sending response...");
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
const getAllReturns = async (req, res) => {

  try {

    const returns = await Return.find()
      .populate("itemId")
      .populate("userId");
    console.log(returns);
    res.json(returns);

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
  getAllReturns,
  getReturnStatus
};