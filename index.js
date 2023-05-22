const express=require('express');
const { connect } = require('./db');
const { userRouter } = require('./routes/user.router');
const { productRouter } = require('./routes/product.router');
const { authenticate } = require('./middleware/authenticate');
const cookieParser = require('cookie-parser');
const app=express();
app.use(express.json());
require('dotenv').config();

app.get('/',(req,res)=>{
    res.send('Welcome to Homepage');
})

app.use(cookieParser());
app.use('/user',userRouter);
app.use(authenticate);
app.use(productRouter);

app.listen(process.env.Port,async()=>{
    try {
        await connect;
        console.log('Connected to Database');
    } catch (err) {
        console.log(err.message);
    }
    console.log(`Server is running at Port ${process.env.Port}`);
})