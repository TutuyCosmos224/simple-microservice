const {Kafka} = require('kafkajs');
const utils = require('../utils/utils.js');
const UserRepository = require('../repository/repository.js');
const producer = require('./kafkaProducer.js');
const userModel = require('../models/userModel.js');
const Connection = require('../connector/connection.js');
require("dotenv").config();
const userRepo = new UserRepository(userModel.userSchema);

Connection.connectMongoose();

const client = new Kafka({
    clientId: 'test-producer',
    brokers: ['localhost:9092'],
});

const consumer = client.consumer({ groupId: 'test-group' });

const KafkaConsume = async(consumer) =>{
    await consumer.run({
        eachMessage: async ({ topic, message }) => {
            try{
                const mes = JSON.parse(message.value.toString());
                    if (topic == 'INSERT') {
                        const isExist = await userRepo.exists({
                            username: mes.data.username,
                        });
                        if (isExist) throw new Error('Username already exist');
                            await userRepo.create(mes.data);
                            console.log('data inserted consumed');
                    }
                    if (topic == 'UPDATE') {
                        const isExist = await userRepo.exists({ _id: mes.data.userId });
                        if (!isExist) throw new Error('User Not Found!');
                            await userRepo.findByIdAndUpdate(mes.data.userId, mes.data.user);
                            console.log('data update consumed');
                    }
                    if (topic == 'DELETE') {
                        const isExist = await userRepo.exists({ _id: mes.data.userId });
                        if (!isExist) throw new Error('User Not Found!');
                            await userRepo.deleteOne({ _id: mes.data.userId });
                            console.log('data delete consumed');
                    }
            }catch (err){
                throw new Error(err.message);
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