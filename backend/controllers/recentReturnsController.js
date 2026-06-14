const Return = require("../models/Return");

// Mirror of the credit calculation in returnController so values are consistent
const calculateGreenCredits = (conditionGrade, disposition, itemValue) => {
  let gradeScore = 0;
  if      (conditionGrade === "A") gradeScore = 50;
  else if (conditionGrade === "B") gradeScore = 30;
  else                             gradeScore = 10;

  let dispositionBonus = 0;
  if      (disposition === "Resell")    dispositionBonus = 40;
  else if (disposition === "Refurbish") dispositionBonus = 25;
  else                                  dispositionBonus = 10;

  let itemValueBonus = 0;
  if      (itemValue > 50000) itemValueBonus = 30;
  else if (itemValue >= 10000) itemValueBonus = 20;
  else                         itemValueBonus = 10;

  return gradeScore + dispositionBonus + itemValueBonus;
};

const getRecentReturns = async (req, res) => {
  try {

    const returns = await Return
      .find()
      .populate("itemId")
      .sort({ createdAt: -1 })
      .limit(20);

    const result = returns.map((r) => {
      const itemValue = r.itemId?.originalPrice || 0;
      const credits   = calculateGreenCredits(r.conditionGrade, r.disposition, itemValue);

      return {
        product:   r.itemId?.name || "Unknown Product",
        grade:     r.conditionGrade || "B",
        decision:  r.disposition   || "Refurbish",
        credits,
        createdAt: r.createdAt
      };
    });

    res.json(result);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getRecentReturns };
