import mongoose from "mongoose";
const assetSchema = new mongoose.Schema({
    title: {
         type: String,
         required: [true, "Please provide a title to your digital asset"],
         maxLength: [200, "The Title should not be above 200 characters"],
     },
    description:{
        type: String,
        required: [true, "Please provide a description to your digital asset"],

    },
    summary:{
        type: String,
        required: [true, "Please provide a summary to your digital asset"],
        maxLength: [100000, "The summary of the asset should not be over 100000 characters"]
    },
    dp:{
        type: String,
        required: [true, "A dp is must for your asset"]
    },
    price:{
         type: Number,
        required: [true, "Please provide a price tag for your asset"]
    },
    priceID:{
         type: String,
        required:[true, " A price ID is required"]
    },
    reviews:[{
        
        rating:{
            type: Number,
            required: [true, "A rating is a must for a review"],
            
            
        },
        text: {
            type: String,
        },
        user_id: {
            type: String, 
            required: [true, "A rating shud belong to an user id"]
        },
        username:{
            type: String, 
            required: [true, "A username is a must of the review"]
        }
        
    }],

    average_rating:{
        type:Number, 
        default: 0
    },

    reviews_count:{
        type: Number, 
        default: 0
    }
    

});


const Asset = mongoose.model('Asset', assetSchema);
export default Asset;