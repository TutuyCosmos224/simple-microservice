const mongoose = require("mongoose");
require("dotenv").config();

async function connectMongoose() {
	await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology:true }).then(() =>{
		console.log("mongoose connected..")
	})
}

module.exports = {connectMongoose};