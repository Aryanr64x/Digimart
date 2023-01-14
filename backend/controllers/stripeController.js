import asyncHandler from 'express-async-handler';
import  nodemailer from 'nodemailer'
import { v4 as uuidv4 } from 'uuid';
import  stripe from 'stripe'

const s = stripe('sk_test_51MK8E9SC0omau1AF0XJP8I6wsS1pEidot6PLVcA1GT7PuRAEiNZgBXfiA0yAUIR7ceuVkB4YPGdZd7xBOACzFaOK00wnbVmbBM')



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

export const pay = asyncHandler(async(req, res)=>{ 
        const {lineItems}  = req.body
        const session  = await s.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            success_url: "https://www.digimartt.netlify.app/success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url: 'http://www.digimartt.netlify.app/cancel'
        })
        res.json({
            url: session.url
        })

});



export const success = asyncHandler(async(req, res)=>{
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
    
})