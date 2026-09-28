import mongoose from 'mongoose';
const schema=new mongoose.Schema({
  name:{type:String,required:true,trim:true},
  email:{type:String,required:true,unique:true,lowercase:true},
  password:{type:String,required:true},
  role:{type:String,enum:['USER','ADMIN'],default:'USER'},
  cashBalance:{type:Number,default:100000}
},{timestamps:true});
export default mongoose.model('User',schema);
