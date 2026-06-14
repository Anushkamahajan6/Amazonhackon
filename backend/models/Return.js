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

    image:{
        type:String
    },

    // AI Output
    conditionGrade:{
        type:String
    },

    conditionScore:{
        type:Number
    },

    damageFindings:[
        String
    ],

    disposition:{
        type:String
    },

    recommendation:{
        type:String
    },

    riskScore:{
        type:Number
    },
    
    reasoning:{
        type:String
    },

    suggestedResalePrice:{
        type:Number
    },

    estimatedRefurbCost:{
        type:Number
    },

    co2Saved:{
        type:Number
    },

    creditsEarned:{
        type:Number
    }

},
{
    timestamps:true
}
);

module.exports = mongoose.model("Return", returnSchema);