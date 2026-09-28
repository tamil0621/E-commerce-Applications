import mongoose from 'mongoose';
const schema=new mongoose.Schema({
  symbol:{type:String,required:true,unique:true,uppercase:true,index:true},
  name:{type:String,required:true},
  sector:String,
  price:{type:Number,required:true},
  previousClose:{type:Number,required:true},
  dayHigh:Number, dayLow:Number, volume:Number,
  active:{type:Boolean,default:true},
  history:[{time:Date,price:Number}]
},{timestamps:true});
export default mongoose.model('Stock',schema);
