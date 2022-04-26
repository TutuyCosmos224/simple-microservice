const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const Connection = require('./connector/connection');
const Routes  = require('./routes/index.js');
const { graphqlHTTP } = require('express-graphql')
require("dotenv").config();


const {typeDefs} = require ('./graphql/schema.js');
const graphqlResolver = require ('./graphql/resolver.js');
const { buildSchema } = require('graphql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/', Routes.Routes());

const graphqlSchema = buildSchema(typeDefs);

const root = {
  addUser : ({ userInput }) => {
    const result = userService.createUser(userInput);
    return result;
  },
  
  users : () => {
    console.log("get user");
    return userService.getAllUsers();
  },
  
  user : ({ id }) => {
    console.log("get user");
    return userService.getUserById(id);
  },
  
  updateUser : ({ id, userInput }) => {
    return userService.updateUser(id, userInput);
  },
  
  deleteUser : ({ id }) => {
    return userService.deleteUser(id);
  },
}

app.use(
    '/graphql',
    graphqlHTTP({
      schema: graphqlSchema,
      root: root,
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


