import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://127.0.0.1:5173",
  },
});

let onlineUsers = [];

io.on("connection", (socket) => {
  // add user

  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });

    console.log("Connected Users:", onlineUsers);

    // send active users
    io.emit("getUsers", onlineUsers);
  });

  // add message
  socket.on("sendMessage", (message) => {
    console.log("onlineUsers", onlineUsers);
    const user = onlineUsers.find(
      (user) => user.userId === message.recipientId
    );

    console.log("incomming", message, user);

    if (user) {
      console.log("sending message");
      io.to(user.socketId).emit("getMessage", message);
    }
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected:", onlineUsers);

    // send active users
    io.emit("getUsers", onlineUsers);
  });
});

io.listen(3000);
