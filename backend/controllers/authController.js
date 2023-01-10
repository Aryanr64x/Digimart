import User from "../models/User.js";
import  asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import Cart from "../models/Cart.js";


export const signup = asyncHandler(async(req, res)=>{
    const {username, email, password, password_repeat} = req.body;
    const user = await User.create({
         username, email, password, password_repeat
        });
    const token = jwt.sign({id: user._id}, "ANNESHA_GUHA");
    await Cart.create({
        user_id: user._id,
        assets: []
    })
    res.json({
        data: {
            token, user
        }
    })

});



export const signin = asyncHandler(async(req,res, next)=>{
   const {email , password} = req.body;
   const user = await User.findOne({email: email}).select('+password');
   console.log(user)
   if(!user || user.password !== password){
        return next(new Error("Invalid Username or password"))
   }


   const token = jwt.sign({id: user._id}, "ANNESHA_GUHA");

   res.json({
       data:{
           token, user:{
               _id: user._id,
               username: user.username,
               email: user.email,
           }
       }
   })


});




export  const protect = asyncHandler(async(req, res, next)=>{
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        const token = req.headers.authorization.split(' ')[1]
        const decoded =   await promisify(jwt.verify)(token, "ANNESHA_GUHA")
        const user  = await User.findOne({_id: decoded.id})
        if(!user){
            return res.status(401).send("User no longer exists in the database");
        }
        req.body.user = user;
        next()
    }else{
        res.status(401).send("Your are not authorized for this request");
    }
})