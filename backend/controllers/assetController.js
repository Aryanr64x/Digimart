import Asset from "../models/Asset.js";
import  asyncHandler from 'express-async-handler'


export  const getAssets = asyncHandler(async (req,res)=>{
        const posts = await Asset.find();
        res.status(200).json({
            data: posts
        });
});

export  const getAsset = asyncHandler(async (req, res)=>{
    const asset = await Asset.findById(req.params.id);
    res.status(200).json({
        data: asset
    })

})