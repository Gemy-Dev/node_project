import express, { json } from 'express';
import corsesRoute from './router/corses.route.js';
import usersRoute from './router/users.route.js';
import mongoose from 'mongoose';
import httpTextStatus from './utils/httpText.status.js';
import status from './utils/httpText.status.js'
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app =express();
app.use(json());
dotenv.config()
// get corses
const uri = process.env.DB_URL;
const port=process.env.PORT;
async function connectDB(){
    await mongoose.connect(uri);
    mongoose.connection.on('error',console.error.bind(console,'connection error:'));
    mongoose.connection.once('open',function(){
        console.log('Connected successfully');
    });

    console.log("DB connected");
}
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use('/api/corses', corsesRoute);
app.use('/api/users',usersRoute);

app.all(/.*/,(req,res,next)=>{
return res.status(400).json(new httpTextStatus.Fail('Error not found Route'))
});

app.use((error,req,res,next)=>{
     res.status(400).json(new status.Fail(error.message))
})

app.listen(port,()=>{
    console.log('server is on');
})


connectDB();

//DKXOQIorYc1UUCLB
