import mongoose from "mongoose";


const assetSchema = new mongoose.Schema({
     title: {
         type: String,
         required: [true, "Please provide a title to your digital asset"],
         maxLength: [20, "The Title should not be above 20 characters"],
     },
    description:{
        type: String,
        required: [true, "Please provide a description to your digital asset"],

    },
    summary:{
        type: String,
        required: [true, "Please provide a summary to your digital asset"],
        maxLength: [100, "The summary of the asset should not be over 100 characters"]
    },
    price:{
         type: Number,
        required: [true, "Please provide a price tag for your asset"]
    },
    priceID:{
         type: String,
        required:[true, " A price ID is required"]
    }

});


const Asset = mongoose.model('Asset', assetSchema);
export default Asset;