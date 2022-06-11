const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
  }

  type Message {
    _id: ID!
    users: Array
  }

  type Query {
    user: [userM]
    message(_id: String): [messageM]
  }

  type Mutation {
    createMessage(user: String!, message: String!): messageM
  }
`;

module.exports = typeDefs;
