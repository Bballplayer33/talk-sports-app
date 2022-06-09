const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { ApolloServer } = require('apollo-server-express');
const db = require('./config/connection');

const authorizationroute = require("./routes/authorization");
const messagesroute = require("./routes/messages");

const app = express();
const server = new ApolloServer({
  // typeDefs,
  // resolvers,
});
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer(typeDefs, resolvers);
 

  app.use("/api/authorization", authorizationroute);
  app.use("/api/messages", messagesroute);
  

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
