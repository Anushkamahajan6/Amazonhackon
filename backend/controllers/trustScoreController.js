const User = require("../models/User");
const Return = require("../models/Return");

// Trust score formula:
//   Base: 50
//   Credits contribution: up to 30 points (3 pts per 10 credits, capped)
//   Return count contribution: up to 20 points (4 pts per return, capped at 5 returns)
//   Result capped at 100
const calculateTrustScore = (greenCredits, returnCount) => {
  const creditScore = Math.min(30, Math.floor(greenCredits / 10) * 3);
  const returnScore = Math.min(20, returnCount * 4);
  return Math.min(100, 50 + creditScore + returnScore);
};

const getTrustScores = async (req, res) => {
  try {

    const users = await User.find();

    const trustData = await Promise.all(
      users.map(async (user) => {
        const returnCount = await Return.countDocuments({ userId: user._id });

        const trustScore = calculateTrustScore(user.greenCredits, returnCount);

        return {
          sellerId:     user._id,
          sellerName:   user.name,
          greenCredits: user.greenCredits,
          returnCount,
          trustScore
        };
      })
    );

    // Return top 5 by trust score descending
    trustData.sort((a, b) => b.trustScore - a.trustScore);

    res.json(trustData.slice(0, 5));

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTrustScores };
