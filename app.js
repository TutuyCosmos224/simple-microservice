import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import Connection from './connector/connection.js';
import Routes  from './routes/index.js';
import dotenv from 'dotenv';
dotenv.config();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/', Routes);

try{
    Connection();
    app.listen(process.env.PORT, ()=>{
        console.log("application running...");
    })
} catch (err){
    throw err;
}