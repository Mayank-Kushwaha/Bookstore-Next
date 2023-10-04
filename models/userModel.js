import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Please provide fullname"],
   
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    phone: {
        type: Number,
        required: [true, "Please provide a phone"],
       
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    address: {
        type: String,
        required: [true, "Please provide a address"],
        
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;