import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import filesRoute from './routes/fileRoute.js';
import cors from 'cors';

dotenv.config();
const app = express();

//middleware for parsing request body
app.use(express.json());

//Middleware to handle CORS policy
//Style 1: Allow all origins with default of cors (*)
app.use(cors());

//style 2: Allow custom origins
// app.use(
//     cors({
//         origin: 'http://localhost:5555',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

//basic load page with content
app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('Hello World!')
});



app.use('/files', filesRoute);




//connect to the db
mongoose.connect(process.env.MONGO_URI).then(() =>{
    console.log('Connection to DB established')

    //start the server on the port provided in .env file
    app.listen(process.env.PORT, () => {
        console.log(`App is listening to port: ${process.env.PORT}`);
    });
}).catch((err) =>{
    console.log(err);
});

//CORS Policy:
/*

Cross Origin Resource Sharing

Server can check origins, methods, and headers.



*/