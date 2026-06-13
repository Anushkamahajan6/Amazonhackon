const mongoose = require("mongoose");

const returnSchema = new mongoose.Schema(
{
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    itemId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Item"
    },

    reason:{
        type:String
    },

    conditionGrade:{
        type:String
    },

    disposition:{
        type:String
    },

    co2Saved:{
        type:Number
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model("Return",returnSchema);