const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const Connection = require('./connector/connection');
const Routes  = require('./routes/index.js');
require("dotenv").config();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/', Routes.Routes());

try{
    Connection.connectMongoose();
    app.listen(process.env.PORT, ()=>{
        console.log("application running...");
    })
} catch (err){
    throw err;
}