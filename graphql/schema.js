const { buildSchema } = require('graphql');

const schema = buildSchema(`
type User {
  _id: ID!
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
type RootQuery {
  user(id:ID!): User!
  users: [User!]!
}
type RootMutation {
  addUser(userInput: UserInputData!): User!
  updateUser(id: ID!, userInput: UserInputData!): User!
  deleteUser(id: ID!): User!
}
schema {
  query: RootQuery
  mutation: RootMutation
}
`);

module.exports = { schema };