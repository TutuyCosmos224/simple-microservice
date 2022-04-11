const {Kafka} = require('kafkajs');
require("dotenv").config();

const client = new Kafka({
    clientId: 'test-produce',
    brokers: ['localhost:9092'],
})

const producer = client.producer()

const run = async() =>{
    await producer.connect()
}

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
        run()
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