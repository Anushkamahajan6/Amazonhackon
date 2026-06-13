const Return = require("../models/Return");

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

    const returnedItem = await Return.create({
      userId,
      itemId,
      reason,
      conditionGrade,
      disposition,
      co2Saved
    });

    res.status(201).json(returnedItem);

  } catch (error) {

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

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  createReturn,
  getReturnStatus
};