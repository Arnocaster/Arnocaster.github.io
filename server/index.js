
const { Server } = require('socket.io');
const World = require('./app/models/world');

const io = new Server({
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});



io.on("connection",(socket) => {
  console.log(`Connection with id : ${socket.id}`);
  world.addPlayer(socket);

  socket.on("disconnect", (reason) => {
    console.log(`Disconnection with id : ${socket.id} because of : ${reason}`);
    world.removePlayer(socket);
  });
});

//Init World;
const world = new World(io);


try {
  io.listen(3000);
  console.log('Socket.io listening');
} catch (err){
  console.trace(err);
}
