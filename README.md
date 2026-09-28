# StockSphere — MERN Stock Trading Platform

A modern full-stack MERN stock trading simulation with JWT authentication, virtual cash, portfolio tracking, market dashboard, charts, and admin moderation.

## Stack
- Frontend: React + Vite, React Router, Axios, Bootstrap, Recharts
- Backend: Node.js + Express, MongoDB + Mongoose, JWT, bcryptjs
- Market data: optional external API; demo market data is included for local development

## Run
### Backend
```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Backend: http://localhost:5000
Frontend: http://localhost:5173

## Demo admin
Create an account normally, then change its role to ADMIN in MongoDB for development/testing.

## Environment
See `backend/.env.example`.

> This is a trading simulation for educational/demo use. It does not execute real securities trades.
