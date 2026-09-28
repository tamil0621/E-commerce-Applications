import express from 'express'; import bcrypt from 'bcryptjs'; import jwt from 'jsonwebtoken';
import User from '../models/User.js'; import Portfolio from '../models/Portfolio.js';
const router=express.Router();
router.post('/register',async(req,res,next)=>{
 try{const {name,email,password}=req.body;if(!name||!email||!password)return res.status(400).json({message:'All fields are required'});
 const exists=await User.findOne({email});if(exists)return res.status(409).json({message:'Email already registered'});
 const user=await User.create({name,email,password:await bcrypt.hash(password,12)});
 await Portfolio.create({user:user._id,holdings:[]});
 res.status(201).json({message:'Account created'});
 }catch(e){next(e)}
});
router.post('/login',async(req,res,next)=>{
 try{const {email,password}=req.body;const user=await User.findOne({email});if(!user||!(await bcrypt.compare(password,user.password)))return res.status(401).json({message:'Invalid email or password'});
 const token=jwt.sign({id:user._id,role:user.role,name:user.name,email:user.email},process.env.JWT_SECRET,{expiresIn:'1d'});
 res.json({token,user:{name:user.name,email:user.email,role:user.role,cashBalance:user.cashBalance}});
 }catch(e){next(e)}
});
export default router;
