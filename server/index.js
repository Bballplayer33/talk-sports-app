const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authorization");
const messageRoutes = require("./routes/messages");
const app = express();
const socket = require("socket.io");
const chatroom = "sports";
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/authorization", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
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
    socket.join(chatroom);
  });

  socket.on("msg-sent", (data) => {
    io.in(chatroom).emit("msg-recieved", data);
  });
});
