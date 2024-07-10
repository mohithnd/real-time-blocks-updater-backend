const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const blocksHandler = require("./handlers/blocksHandler");
const { PORT } = require("./configs/serverConfig");

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

blocksHandler(io);

server.listen(PORT, () => {
  console.log(`Server Is Running On Port: ${PORT}`);
});
