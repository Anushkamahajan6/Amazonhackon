const mongoose = require("mongoose");

const creditTransactionSchema = new mongoose.Schema(
{
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    amount:{
        type:Number,
        required:true
    },

    type:{
        type:String,
        enum:["ADD","REDEEM"],
        required:true
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model(
    "CreditTransaction",
    creditTransactionSchema
);