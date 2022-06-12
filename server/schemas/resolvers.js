const { userM, messageM } = require("../models");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    users: async () => {
      return userM.find({});
    },
    message: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return messageM.find(params);
    },
  },
  Mutation: {
    createMessage: async (parent, args) => {
      const message = await messageM.create(args);
      return message;
    },
    // createVote: async (parent, { _id, techNum }) => {
    //   const vote = await messageM.findOneAndUpdate(
    //     { _id },
    //     { $inc: { [`tech${techNum}_votes`]: 1 } },
    //     { new: true }
    //   );
    //   return vote;
    // },
  },
};

module.exports = resolvers;
