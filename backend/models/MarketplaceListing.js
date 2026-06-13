const mongoose = require("mongoose");

const marketplaceListingSchema = new mongoose.Schema(
{
    itemId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Item",
        required:true
    },

    sellerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    grade:{
        type:String
    },

    listingPrice:{
        type:Number
    },

    ecoBadge:{
        type:String,
        default:"Certified Refurbished"
    },

    status:{
        type:String,
        default:"ACTIVE"
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model(
    "MarketplaceListing",
    marketplaceListingSchema
);