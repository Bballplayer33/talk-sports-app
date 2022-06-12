const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String
    password: String
  }

  type Message {
    _id: ID!
    sender: User
  }

  type Query {
    users: [User]
    message(_id: String): Message
  }

  type Mutation {
    createMessage(user: String!, message: String!): Message
  }
`;

module.exports = typeDefs;
