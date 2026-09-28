import express from 'express'; import {auth} from '../middleware/auth.js'; import User from '../models/User.js'; import Stock from '../models/Stock.js'; import Portfolio from '../models/Portfolio.js'; import Transaction from '../models/Transaction.js';
const router=express.Router();
router.post('/',auth,async(req,res,next)=>{
 try{const {symbol,type,quantity}=req.body;const qty=Number(quantity);if(!['BUY','SELL'].includes(type)||!Number.isInteger(qty)||qty<1)return res.status(400).json({message:'Invalid trade'});
 const stock=await Stock.findOne({symbol:symbol.toUpperCase(),active:true});if(!stock)return res.status(404).json({message:'Stock not found'});
 const user=await User.findById(req.user.id);const p=await Portfolio.findOne({user:user._id});const total=+(stock.price*qty).toFixed(2);let h=p.holdings.find(x=>x.stock.toString()===stock._id.toString());
 if(type==='BUY'){if(user.cashBalance<total)return res.status(400).json({message:'Insufficient virtual balance'});user.cashBalance-=total;if(h){h.avgPrice=((h.avgPrice*h.quantity)+(stock.price*qty))/(h.quantity+qty);h.quantity+=qty}else p.holdings.push({stock:stock._id,quantity:qty,avgPrice:stock.price});}
 else {if(!h||h.quantity<qty)return res.status(400).json({message:'Not enough shares'});user.cashBalance+=total;h.quantity-=qty;if(h.quantity===0)p.holdings=p.holdings.filter(x=>x.stock.toString()!==stock._id.toString());}
 await user.save();await p.save();const tx=await Transaction.create({user:user._id,stock:stock._id,type,quantity:qty,price:stock.price,total});res.status(201).json({message:`${type} order completed`,transaction:tx,cashBalance:user.cashBalance});
 }catch(e){next(e)}
});
router.get('/history',auth,async(req,res)=>res.json(await Transaction.find({user:req.user.id}).populate('stock').sort({createdAt:-1}).limit(50)));
export default router;
