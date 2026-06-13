const CreditTransaction = require("../models/CreditTransaction");
const User = require("../models/User");

// Get Credits
const getCredits = async (req, res) => {
  try {

    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      userId: user._id,
      greenCredits: user.greenCredits
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// Redeem Credits
const redeemCredits = async (req, res) => {

  try {

    const { userId, amount } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (user.greenCredits < amount) {
      return res.status(400).json({
        message: "Insufficient credits"
      });
    }

    user.greenCredits -= amount;

    await user.save();

    await CreditTransaction.create({
      userId,
      amount,
      type: "REDEEM"
    });

    res.json({
      message: "Credits redeemed successfully",
      remainingCredits: user.greenCredits
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// Credit History
const getCreditHistory = async (req, res) => {

  try {

    const history = await CreditTransaction.find({
      userId: req.params.userId
    }).sort({ createdAt: -1 });

    res.json(history);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  getCredits,
  redeemCredits,
  getCreditHistory
};