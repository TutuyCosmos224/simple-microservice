const express = require ("express");
const app = express();
const service = require("../service/index.js");



app.get('/', (req,res) => {
    res.send("woi ajg")
})

app.listen(4000, () =>{
    console.log("running application")
})

app.get('/users', service.getAll ,async(req,res)=>{
    res.send("users shown..");
})

app.get('/users/:uid', service.getById, async(req,res)=>{
    res.send("user found..");
})

app.post('/user', service.insertUser, async(req,res)=>{
    res.send("users inserted test..");
})

app.delete('/users/:uid',service.deleteUser, async (req,res)=>{
    res.send("users deleted test..");
})

app.post('/updateUser/:uid', service.updateUser, async(req,res)=>{
    res.send("users updated test..");
})