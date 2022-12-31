import express from 'express';
import mongoose from "mongoose";
import  stripe from 'stripe'
import assetRouter from "./routes/assetRouter.js";
import  cors from 'cors'
import { v4 as uuidv4 } from 'uuid';
import {errorHandler} from "./controllers/errorController.js";
import authRouter from "./routes/authRouter.js";
import {protect} from "./controllers/authController.js";
import  nodemailer from 'nodemailer'


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
            success_url: "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url: 'http://localhost:3000/cancel'
        })
        console.log("ALL GOOD")
        res.json({
            url: session.url
        })

    }catch(e){
        console.log(e)
        res.status(400).json("Dam shit ! Just got real")
    }
})

const sendEmail = async(description, email)=>{
    const link = description.split(' ')[0]
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

   try{
       let info = await transporter.sendMail({
           from: '"Team Digimart 👻" <aryansaketr64x@gmail.com>', // sender address
           to: email, // list of receivers
           subject: "Thanks for purchasing, Here is your link", // Subject line
           text: "Here is the downloadable link to your product. Thanks for shopping at digimart "+link, // plain text body

       });

       console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
       return true
   }catch(e){
       console.log(e)
       return false
   }



}

app.post('/api/payment/success', protect,async(req, res)=>{
    try{
        const session = await s.checkout.sessions.retrieve(req.body.session_id);
        s.checkout.sessions.listLineItems(
            req.body.session_id,
            { },
            function(err, lineItems) {
                if(!err){
                    lineItems.data.forEach( async (lineItem)=>{

                        const isSuccess = await sendEmail(lineItem.description, req.body.user.email)
                        if(isSuccess){
                         return   res.status(200).json({ message: "Link Successfully sent", tag: "SENT" })

                        }else{
                            res.status(400).json({message: "CANNOT SEND MESSAGE"});
                        }
                        })
                }else{
                    res.status(400).json({
                        message:   "Something went wrong"
                    })
                }
            }
            );
    }catch(e){
        console.log("This has been called")
        res.status(400).json("Things failed")
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
