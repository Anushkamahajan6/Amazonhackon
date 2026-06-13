const Item = require("../models/Item");

// Get all marketplace items
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

// Get item by ID
const getItemById = async (req, res) => {

  try {

    const item = await Item.findById(req.params.itemId);

    if (!item) {

      return res.status(404).json({
        message: "Item not found"
      });

    }

    res.json(item);

  }
  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  getMarketplaceItems,
  getItemById
};