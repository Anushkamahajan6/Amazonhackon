const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema(
{
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    itemId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Item",
        required:true
    },

    score:{
        type:Number,
        default:0
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model(
    "Recommendation",
    recommendationSchema
);