const app = {
  canvas: document.getElementById('canvas-world'),
  world: null,
  init: (info) => {
    console.log(info);
    const canvas = app.canvas;
    canvas.width = info.width;
    canvas.height = info.height;
    console.log('Initialisation Complete');
    app.render();
  },
  render: () => {
    const canvas = app.canvas;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 400, 400);
    if (app.world) {
      app.world.forEach(player => {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "blue";
        ctx.fillStyle = "blue";
        ctx.arc(player.position.x, player.position.y, 5, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();
      });
    }

    requestAnimationFrame(app.render);
  },
  update: () => {

  },
  addListeners: () => {
    
  }
}

document.addEventListener('DOMContentLoaded', () => {
  //Socket.io Managment => Maybe a module later
  const socket = io("http://localhost:3000");

  socket.on('InitWorld', (info) => {
    app.init(info);
  })

  socket.on('updateWorld', (world) => {
    //! For the moment World = Players
    app.world = world;
    console.log(world);
  });
})