const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const Connection = require('./connector/connection');
require("dotenv").config();

console.log(process.env)


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

try{
    Connection.connectMongoose();
    app.listen(process.env.PORT, ()=>{
        console.log("application running...");
    })
} catch (err){
    throw err;
}