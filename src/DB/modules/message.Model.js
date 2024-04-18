import mongoose from "mongoose";
const messageSceama = new mongoose.Schema({
    Text:String,
    RecievedId:{type:mongoose.Schema.Types.ObjectId , ref:'User' ,required: true},
    isDelete:{type:Boolean , default:false}
},{timestamps:true})
 const messageModel = mongoose.model(`message`,messageSceama)
 export default messageModel