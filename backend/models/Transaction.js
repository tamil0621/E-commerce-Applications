import mongoose from 'mongoose';
const schema=new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},
  stock:{type:mongoose.Schema.Types.ObjectId,ref:'Stock',required:true},
  type:{type:String,enum:['BUY','SELL'],required:true},
  quantity:{type:Number,required:true,min:1},
  price:{type:Number,required:true},
  total:{type:Number,required:true},
  status:{type:String,enum:['COMPLETED','CANCELLED'],default:'COMPLETED'}
},{timestamps:true});
export default mongoose.model('Transaction',schema);
