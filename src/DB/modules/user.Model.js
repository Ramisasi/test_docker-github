import mongoose from "mongoose";

const userSceama = new mongoose.Schema({
    FirstName:String,
    lastName:String,
    Email:{type:String, require:true},
    Password:{type:String,require:true},
    ConfirmEmail:{type:Boolean, default:false},
    Age:Number,
    Phone:String,
    isOnline:{type:Boolean, default:false},
    LastSeen:String,
    isDelete:{type:Boolean , default:false}
},{timestamps:true})

 const userModel = mongoose.model(`User`,userSceama)

 export default userModel