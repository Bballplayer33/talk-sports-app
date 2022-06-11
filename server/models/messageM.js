const { Schema, model } = require('mongoose');

const messageSchema = Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    // users: Array,
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const messageM = model('messageM', messageSchema);

module.exports = messageM;
