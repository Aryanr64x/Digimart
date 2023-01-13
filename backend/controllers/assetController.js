import Asset from "../models/Asset.js";
import asyncHandler from 'express-async-handler'


export const getAssets = asyncHandler(async (req, res) => {
    const assets = await Asset.find().select('-reviews -description',);
    res.status(200).json({
        data: assets
    });
});

export const getAsset = asyncHandler(async (req, res) => {
    const asset = await Asset.findById(req.params.id);
    res.status(200).json({
        data: asset
    })

})


const computeNewAverage = (x, z , y)=>{
        return (x*z + y)/(z+1)
}


export const createReview = asyncHandler(async (req, res) => {

    const asset = await Asset.findById(req.params.id)
    const newRating = computeNewAverage(asset.average_rating, asset.reviews_count, req.body.rating)
    asset.average_rating = newRating
    asset.reviews_count ++
    
    asset.reviews.push(req.body)
    await asset.save()
    res.status(200).json({
        data: asset
    })
})