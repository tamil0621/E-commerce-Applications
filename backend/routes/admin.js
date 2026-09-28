import express from 'express'; import {auth,admin} from '../middleware/auth.js'; import User from '../models/User.js'; import Stock from '../models/Stock.js'; import Transaction from '../models/Transaction.js';
const router=express.Router();router.use(auth,admin);
router.get('/stats',async(_,res)=>res.json({users:await User.countDocuments(),stocks:await Stock.countDocuments({active:true}),trades:await Transaction.countDocuments(),volume:(await Transaction.aggregate([{$group:{_id:null,total:{$sum:'$total'}}}]))[0]?.total||0}));
router.get('/users',async(_,res)=>res.json(await User.find().select('-password').sort({createdAt:-1})));
router.get('/trades',async(_,res)=>res.json(await Transaction.find().populate('user','name email').populate('stock','symbol name').sort({createdAt:-1}).limit(100)));
router.patch('/stocks/:id',async(req,res)=>res.json(await Stock.findByIdAndUpdate(req.params.id,req.body,{new:true})));
export default router;
