import express from 'express'; import Portfolio from '../models/Portfolio.js'; import User from '../models/User.js'; import {auth} from '../middleware/auth.js';
const router=express.Router();
router.get('/',auth,async(req,res)=>{const p=await Portfolio.findOne({user:req.user.id}).populate('holdings.stock');const u=await User.findById(req.user.id).select('cashBalance');res.json({cashBalance:u.cashBalance,holdings:p?.holdings||[]});});
export default router;
