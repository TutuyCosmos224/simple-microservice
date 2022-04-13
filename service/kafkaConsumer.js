const {Kafka} = require('kafkajs');
const utils = require('../utils/utils.js');
const UserRepository = require('../repository/repository.js');
const producer = require('./kafkaProducer.js');
const userModel = require('../models/userModel.js');
const Connection = require('../connector/connection.js');
const mongoose = require('mongoose');
require("dotenv").config();
const userRepo = new UserRepository(userModel.userSchema);

const client = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: ['localhost:9092'],
});

const consumer = client.consumer({ groupId: 'test-group' });

const KafkaConsume = async(consumer) =>{
    Connection.connectMongoose()
    await consumer.run({
        eachMessage: async ({ topic, message }) => {
            try{
                const mes = JSON.parse(message.value.toString());
                    if (topic == 'INSERT') {
                        await userRepo.create(mes.data);
                        console.log('data inserted consumed');
                    }
                    if (topic == 'UPDATE') {
                        await userRepo.updateUser(mes.data._id, mes.data);
                        console.log('data update consumed');
                    }
                    if (topic == 'DELETE') {
                        await userRepo.deleteById(mes.data.userId);
                        console.log('data delete consumed');
                    }
            }catch (err){
                // throw new Error(err.message);
            }
        },
    })
}

const run = async(consumer)=>{
    await consumer.connect();
  
    await consumer.subscribe({ topic: 'UPDATE', fromBeginning: true });
    await consumer.subscribe({ topic: 'INSERT', fromBeginning: true });
    await consumer.subscribe({ topic: 'DELETE', fromBeginning: true });

    KafkaConsume(consumer)
}

run(consumer)