const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const Connection = require('./connector/connection');
const Routes  = require('./routes/index.js');
const { graphqlHTTP } = require('express-graphql')
require("dotenv").config();

const graphqlSchema = require ('./graphql/schema.js');
const graphqlResolver = require ('./graphql/resolver.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/', Routes.Routes());

//app
try{
    Connection.connectMongoose();
    app.listen(process.env.PORT, ()=>{
        console.log("application running...");
    })
} catch (err){
    throw err;
}

app.use(
    '/graphql',
    graphqlHTTP({
      schema: graphqlSchema,
      rootValue: graphqlResolver,
      graphiql: true,
    }),
  );