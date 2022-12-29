import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please provide an username!"],
        minLength: 4,
    },
    email:{
        type: String,
        required: [true, "Please provide an email ID"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "A password is a must"],
        select: false
    },
    password_repeat:{
        type: String,
        required: [true, "Confirm Password is needed"],
        validate:{
            validator:  function(val){
                return (this.password === val);
            },
            message: "Password Should Match Password Confirm"
        },
        select: false
    },

    }
)



const User = mongoose.model('User', userSchema);
export  default  User;