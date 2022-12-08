import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://127.0.0.1:5173/",
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  // add user

  socket.on("add-new-user", (userId) => {
    if (!activeUsers.some((user) => user.userId === userId)) {
      activeUsers.push({
        userId,
        socketId: socket.id,
      });
    }

    console.log("Connected Users:", activeUsers);

    // send active users
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected:", activeUsers);

    // send active users
    io.emit("get-users", activeUsers);
  });
});

io.listen(3000);
