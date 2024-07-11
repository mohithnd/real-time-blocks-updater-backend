const blocksData = {};

let users = 0;

function blocksHandler(io) {
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    users++;
    io.emit("users", { users });

    io.emit("load", { id: socket.id, blocksData });

    socket.on("update", ({ id, ind, state }) => {
      console.log(id, ind, state);

      blocksData[ind] = state;
      io.emit("render", { id, ind, state });
    });

    socket.on("disconnect", () => {
      console.log(`User Disconnected: ${socket.id}`);

      users--;
      io.emit("users", { users });
    });
  });
}

module.exports = blocksHandler;
