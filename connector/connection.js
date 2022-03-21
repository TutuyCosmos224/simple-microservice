const mongoose = require("mongoose");
const config = require("../config/config.js");

async function connectMongoose() {
	await mongoose.connect(config.db.url, { useNewUrlParser: true, useUnifiedTopology:true }).then(() =>{
		console.log("mongoose connected..")
	})
}

module.exports = {connectMongoose};