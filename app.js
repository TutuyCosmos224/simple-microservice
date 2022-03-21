import { connectMongoose } from "./connector/connection";
import config from "./config/config";
import express, { json, urlencoded } from 'express';

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

try{
    connectMongoose();
    app.listen(config.app.port, ()=>{
        console.log("application running...");
    })
} catch (err){
    throw err;
}