const blocksData = {};

function blocksHandler(io) {
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    io.emit("load", { id: socket.id, blocksData });

    socket.on("update", ({ id, ind, state }) => {
      console.log(id, ind, state);

      blocksData[ind] = state;
      io.emit("render", { id, ind, state });
    });

    socket.on("disconnect", () => {
      console.log(`User Disconnected: ${socket.id}`);
    });
  });
}

module.exports = blocksHandler;
