import express from 'express';
import mongoose from "mongoose";
import assetRouter from "./routes/assetRouter.js";
import  cors from 'cors'
import {errorHandler} from "./controllers/errorController.js";
import authRouter from "./routes/authRouter.js";
import stripeRouter from './routes/stripeRouter.js';
import cartRouter from './routes/cartRouter.js';


const app = express();

app.use(cors())
app.use(express.json());
app.use(express.static('public'));

app.use('/api/payment', stripeRouter)
app.use('/api/assets', assetRouter)
app.use('/api', authRouter);
app.use('/api/cart', cartRouter)
app.use((req, res, next)=>{
    next(new Error("No Route Exists"))
});
app.use(errorHandler);






mongoose.connect("mongodb+srv://saket:annesha@cluster0.1z7vflv.mongodb.net/?retryWrites=true&w=majority", ()=>{
    console.log("MongoDB is now running");
})
app.listen(8000, ()=>{
    console.log("The server has started")
});
