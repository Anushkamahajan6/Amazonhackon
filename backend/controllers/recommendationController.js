const Item = require("../models/Item");

const getRecommendations = async (req, res) => {

    try {

        const items = await Item.find().limit(5);

        res.json(items);

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

module.exports = {
    getRecommendations
};