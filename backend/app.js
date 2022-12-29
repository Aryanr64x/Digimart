import express from 'express';
import mongoose from "mongoose";
import  stripe from 'stripe'
import assetRouter from "./routes/assetRouter.js";
import  cors from 'cors'
import { v4 as uuidv4 } from 'uuid';
import {errorHandler} from "./controllers/errorController.js";
import authRouter from "./routes/authRouter.js";
import {protect} from "./controllers/authController.js";


const s = stripe('sk_test_51MK8E9SC0omau1AF0XJP8I6wsS1pEidot6PLVcA1GT7PuRAEiNZgBXfiA0yAUIR7ceuVkB4YPGdZd7xBOACzFaOK00wnbVmbBM')


const app = express();
app.use(cors())
app.use(express.json());
app.use(express.static('public'));

app.post('/api/payment',protect ,async(req, res)=>{
    try{
        const {lineItems}  = req.body
        const session  = await s.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel'
        })

        res.json({
            url: session.url
        })


    }catch(e){
        console.log(e)
        res.status(400).json("Dam shit ! Just got real")
    }
})



app.use('/api/assets', assetRouter)
app.use('/api', authRouter);
app.use(errorHandler);






mongoose.connect("mongodb+srv://saket:annesha@cluster0.1z7vflv.mongodb.net/?retryWrites=true&w=majority", ()=>{
    console.log("MongoDB is now running");
})
app.listen(8000, ()=>{
    console.log("The server has started")
});
