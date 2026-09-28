import express from 'express'; import Stock from '../models/Stock.js'; import {auth} from '../middleware/auth.js';
const router=express.Router();
const demo=[
 ['AAPL','Apple Inc.','Technology',227.45],['MSFT','Microsoft','Technology',512.18],['NVDA','NVIDIA','Semiconductors',176.32],
 ['AMZN','Amazon','Consumer',231.76],['TSLA','Tesla','Automotive',423.81],['GOOGL','Alphabet','Technology',251.08],
 ['META','Meta Platforms','Technology',741.12],['NFLX','Netflix','Entertainment',1194.55]
];
router.get('/',async(req,res)=>{let stocks=await Stock.find({active:true}).sort({symbol:1}); if(!stocks.length){stocks=await Promise.all(demo.map(async ([symbol,name,sector,price])=>Stock.create({symbol,name,sector,price,previousClose:price*0.99,dayHigh:price*1.02,dayLow:price*.97,volume:Math.floor(Math.random()*90000000),history:Array.from({length:20},(_,i)=>({time:new Date(Date.now()-(19-i)*3600000),price:price*(.97+Math.random()*.06)}))})));} res.json(stocks);});
router.get('/:symbol',async(req,res)=>{const stock=await Stock.findOne({symbol:req.params.symbol.toUpperCase()}); if(!stock)return res.status(404).json({message:'Stock not found'}); res.json(stock);});
router.get('/refresh/market',auth,async(req,res)=>{const stocks=await Stock.find({active:true});for(const s of stocks){const move=(Math.random()-.48)*.012;s.previousClose=s.price;s.price=+(s.price*(1+move)).toFixed(2);s.dayHigh=Math.max(s.dayHigh||s.price,s.price);s.dayLow=Math.min(s.dayLow||s.price,s.price);s.history.push({time:new Date(),price:s.price});if(s.history.length>100)s.history.shift();await s.save();}res.json({message:'Market refreshed'});});
export default router;
