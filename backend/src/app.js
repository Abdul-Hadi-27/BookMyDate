/* eslint-disable no-undef */
const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const morgan=require('morgan');
const connectDB=require('./db/db')
const authRoutes=require('./routes/auth.routes')
const movieRoutes=require('./routes/movie.routes')
const showRoutes=require('./routes/show.routes')
const cors=require('cors')
const paymentRoutes=require('./routes/payment.routes')
require('dotenv').config();





connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


// Auth Routes
app.use('/api/auth', authRoutes);
//movie routes
app.use('/api/auth',movieRoutes)

//show creation routes

app.use('/api/auth',showRoutes)
app.use('/api/auth',paymentRoutes)



module.exports=app;
