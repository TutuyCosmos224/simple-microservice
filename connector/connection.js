const mongoose = require("mongoose");

const connectionString = "mongodb+srv://HansenE:Abc123@test1.67ehw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

var User;
var schema = require('../repository/schema');

async function connectMongoose() {
	await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology:true }).then(() =>{
		console.log("mongoose connected..")
	})
	var table = schema.table;
	User = mongoose.model('test1',table)
}

module.exports = {connectMongoose, User};