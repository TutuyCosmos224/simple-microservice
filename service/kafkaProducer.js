const {Kafka} = require('kafkajs');
require("dotenv").config();

const client = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: [process.env.KAFKA_BROKERS],
})

const producer = client.producer()

// const run = async() => {
//     await producer.connect()

//     await producer.send({
//         topic: 'test-topic',
//         messages: [
//         { value: 'Hello KafkaJS user!' },
//         ],
//     })
  
// }

// run().catch(console.error)

const kafkaProduce = {
    sendMessage: async (topic,data) =>{
        await producer.connect();
        const event = {
            timestamp: Date.now(),
            data,
        }

        const bufferData = Buffer.from(JSON.stringify(event));
        const mes = {
            topic,
            messages: [{value: bufferData}],
        };
        await producer.send(mes);
        console.log(mes.messages)
    },
};

module.exports = {kafkaProduce};