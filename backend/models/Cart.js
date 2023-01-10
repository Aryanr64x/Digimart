import mongoose from 'mongoose'

const cartSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: [true, "User ID is required in a cart"],
    },
    assets: [{
        _id: {
            type: String,
            required: [true, "The asset in the cart needs ID"],
        },
        title: {
            type: String,
            required: [true, "The asset in the cart needs this"]
        },
        price: {
            type: Number,
            required: [true, "Please provide a price tag for your asset"]
        },
        priceID: {
            type: String,
            required: [true, " A price ID is required"]
        }
    }]


});




const Cart = mongoose.model('Cart', cartSchema)
export default Cart;