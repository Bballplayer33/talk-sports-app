const { userM } = require("../models/userM");
const { messageM } = require("../models/messageM");

const resolvers = {
  Query: {
    user: async () => {
      return userM.find({});
    },
    messages: async (parent, { _id }) => {
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
