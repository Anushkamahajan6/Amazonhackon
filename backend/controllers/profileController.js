const Return = require("../models/Return");

const getUserProfile = async (req, res) => {

  try {

    const returns = await Return.find({
      userId: req.params.userId
    }).populate("itemId");

    let profile = {};

    returns.forEach(returnItem => {

         if (!returnItem.itemId) {
    return;
  }


      const category = returnItem.itemId.category;

      if (profile[category]) {

        profile[category]++;

      }
      else {

        profile[category] = 1;

      }

    });

    res.json(profile);

  }
  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  getUserProfile
};