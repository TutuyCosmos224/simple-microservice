import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

async function connectMongoose() {
	await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology:true }).then(() =>{
		console.log("mongoose connected..")
	})
}

export default connectMongoose;