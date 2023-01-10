import express from 'express'
import { protect } from '../controllers/authController.js';
import { pay, success } from '../controllers/stripeController.js';
const stripeRouter = express.Router();

stripeRouter.post('', protect, pay);
stripeRouter.post('/success', protect, success);



export default stripeRouter;
