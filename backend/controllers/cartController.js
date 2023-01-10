import asyncHandler from 'express-async-handler';
import Cart from '../models/Cart.js';

export const get = asyncHandler(async (req, res) => {

    const cart = await Cart.findOne({user_id: req.body.user._id})
    res.status(200).json({data:cart})

})


export const insert = asyncHandler(async (req, res) => {
   
   const cart = await Cart.findOne({user_id: req.body.user._id})
   await cart.update({assets: [... cart.assets, req.body.asset]});
   res.status(200).json("Success")
});