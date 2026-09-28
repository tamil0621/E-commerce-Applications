import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
import stockRoutes from './routes/stocks.js';
import portfolioRoutes from './routes/portfolio.js';
import tradeRoutes from './routes/trades.js';
import adminRoutes from './routes/admin.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();
const app = express();
app.use(cors({origin: process.env.CLIENT_URL || 'http://localhost:5173'}));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_,res)=>res.json({status:'ok', service:'StockSphere API'}));
app.use('/api/auth', authRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/trades', tradeRoutes);
app.use('/api/admin', adminRoutes);
app.use((req,res)=>res.status(404).json({message:`Route not found: ${req.method} ${req.originalUrl}`}));
app.use(errorHandler);

const port=process.env.PORT||5000;
mongoose.connect(process.env.MONGO_URI)
  .then(()=>app.listen(port,()=>console.log(`API running on ${port}`)))
  .catch(err=>{console.error('MongoDB connection failed. Check that MongoDB is running and MONGO_URI in backend/.env is correct.');console.error(err.message);process.exit(1);});
