import { Server } from "socket.io";
import http from "http";
import app from "./src/app.js";
import connectdb from "./src/config/db.js";
import { ENV } from "./src/lib/env.js";
import { socketAuthMiddleware } from "./src/middleware/socket.auth.middleware.js";

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: ENV.FRONT_END,
    credentials: true,
  },
});

io.use(socketAuthMiddleware);

export function getReceiverSocketId(userId){
  return userSocketMap[userId]
}

const userSocketMap = {};
io.on("connection", (socket) => {
  console.log("A user conneted ", socket.user.fullname);

  const userId = socket.userID;
  userSocketMap[userId] = socket.id;

  io.emit("getOnlineUser", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.user.fullname);
    delete userSocketMap[userId];
    io.emit("getOnlineUser", Object.keys(userSocketMap));
  });
});

const port = ENV.PORT || 8080;

const startServer = async () => {
  try {
    await connectdb();
    server.listen(port, () => {
      console.log(`server is up and running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
};

startServer();
