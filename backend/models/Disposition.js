const mongoose = require("mongoose");

const dispositionSchema = new mongoose.Schema(
{
    returnId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Return",
        required:true
    },

    type:{
        type:String,
        enum:[
            "Resell",
            "Refurbish",
            "Recycle"
        ],
        required:true
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model(
    "Disposition",
    dispositionSchema
);