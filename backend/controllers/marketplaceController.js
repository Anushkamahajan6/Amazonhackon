const Item = require("../models/Item");

const getMarketplaceItems = async (req, res) => {

  try {

    let filter = {};

    if (req.query.category) {

      filter.category = req.query.category;

    }

    const items = await Item.find(filter);

    res.json(items);

  }
  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  getMarketplaceItems
};