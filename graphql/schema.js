const { buildSchema } = require('graphql');

exports.typeDefs = `
type User {
  _id: String!
  name: String!
  username: String!
  password: String!
  address: String!
  gender: String!
  status: String
  createdDate: String!
  modifyDate: String!
}
input UserInputData {
  name: String!
  username: String!
  password: String!
  address: String!
  gender: String!
}
type Query {
  user(id:String!): User!
  users: [User!]!
}
type Mutation {
  addUser(userInput: UserInputData!): User!
  updateUser(id: String!, userInput: UserInputData!): User!
  deleteUser(id: String!): User!
}
`;