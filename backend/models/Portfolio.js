import mongoose from 'mongoose';
const schema=new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId,ref:'User',unique:true},
  holdings:[{stock:{type:mongoose.Schema.Types.ObjectId,ref:'Stock'},quantity:Number,avgPrice:Number}]
},{timestamps:true});
export default mongoose.model('Portfolio',schema);
