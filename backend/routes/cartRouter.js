import express from 'express'
import { protect } from '../controllers/authController.js';
import { get, insert } from '../controllers/cartController.js';

const cartRouter= express.Router()
cartRouter.get('', protect, get)
cartRouter.post('', protect, insert)
export default cartRouter;