const Item = require("../models/Item");

const getRecommendations = async (profile) => {

  let topCategory = null;
  let maxCount = 0;

  for (let category in profile) {

    if (profile[category] > maxCount) {

      maxCount = profile[category];
      topCategory = category;

    }

  }

  if (!topCategory) {

    return [];

  }

  const recommendations = await Item.find({
    category: topCategory
  }).limit(5);

  return recommendations;

};

module.exports = {
  getRecommendations
};