const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const Connection = require('./connector/connection');
const Routes  = require('./routes/index.js');
const { graphqlHTTP } = require('express-graphql')
require("dotenv").config();
const userService = require('./service/service.js');


const {typeDefs} = require ('./graphql/schema.js');
const {root} = require ('./graphql/resolver.js');
const { buildSchema } = require('graphql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/', Routes.Routes());

const schema = buildSchema(typeDefs);

app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      rootValue: root,
      graphiql: true,
    }),
  );

//app
try{
    Connection.connectMongoose();
    app.listen(process.env.PORT, ()=>{
        console.log("application running...");
    })
} catch (err){
    throw err;
}


