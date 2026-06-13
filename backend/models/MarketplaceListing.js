const mongoose = require("mongoose");

const marketplaceSchema = new mongoose.Schema(
{
    itemId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Item"
    },

    grade:{
        type:String
    },

    price:{
        type:Number
    },

    ecoBadge:{
        type:Boolean,
        default:true
    },

    status:{
        type:String,
        default:"Available"
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model(
"MarketplaceListing",
marketplaceSchema
);