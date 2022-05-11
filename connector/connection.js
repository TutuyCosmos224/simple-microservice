const mongoose = require("mongoose");
require("dotenv").config();

async function connectMongoose() {
	await mongoose.connect("mongodb+srv://HansenE:Abc123@test1.67ehw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology:true }).then(() =>{
		console.log("mongoose connected..")
	})
}

module.exports = {connectMongoose};