const mongoose = require('mongoose')
const schema = require('../repository/schema.js')
const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const axios = require('axios');

const Connection = require('../connector/connection');
const User = Connection.User;

app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json()); 

async function initialLoad() {
	await Connection.connectMongoose();
}

initialLoad()

//GET all users
const getAll =  function (req,res,next){
    User.find().then((users) =>{
        res.send(users)
    }).catch((err) => {
        if (err){
            throw err
        }
    })
	next()
}

//GET by ID
const getById = function(req,res,next){
	User.findById(req.params.uid).then((user) => {
		if(user){
			res.json(user)
		} else {
			res.sendStatus(404)
		}
	}).catch( err => {
		if(err) {
			throw err
		}
	})
	next()
}

const insertUser = function (req,res,next){
	const newUser = {
		"name" : req.body.name,
		"username" : req.body.username,
		"password" : req.body.password,
		"gender" : req.body.gender,
		"address" : req.body.address
	}
	const user = new User(newUser)
	user.save().then((r) =>{
		res.send("User created..")
	}).catch((err)=>{
		if (err){
			throw err
		}
	})
}

const deleteUser = function(req,res,next){
	User.findByIdAndDelete(req.params.uid).then(()=>{
		res.send("User deleted..")
	}).catch(()=>{
		res.sendStatus(404)
	})
	next()
}

const updateUser = function(req,res,next){
	const updateUser = {
		"name" : req.body.name,
		"username" : req.body.username,
		"password" : req.body.password,
		"gender" : req.body.gender,
		"address" : req.body.address,
		"modifyDate" : Date.now()
	}
	User.findOneAndUpdate({_id:req.params.uid},updateUser).then(() =>{
		res.send("User updated..")
	}).catch((err)=>{
		if (err){
			throw err
		}
	})
	next()
}
module.exports = {initialLoad, getAll, getById, insertUser, deleteUser, updateUser}



