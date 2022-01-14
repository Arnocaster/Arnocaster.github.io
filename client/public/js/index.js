const app = {
  canvas: document.getElementById('canvas-world'),
  //! By the moment World = Players
  world: null,
  playerId: null,
  player: null,
  socket: null,
  input : [],
  init: (obj) => {
    const settings = obj.settings;
    app.player =
      console.clear();
    const canvas = app.canvas;
    canvas.width = settings.width;
    canvas.height = settings.height;
    app.addListeners();
    console.log('Initialisation Complete');
    app.update();
  },
  render: () => {
    const canvas = app.canvas;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 400, 400);
    if (app.world) {
      app.world.forEach(player => {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";
        ctx.fillStyle = player.color;
        ctx.arc(player.position.x, player.position.y, 5, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();
      });
    }
  },
  update: () => {
    const world = app.world;
    if (world) {
      app.player = world.find(player => player.id === app.playerId);
    }
    app.movePlayer();
    app.render();
    requestAnimationFrame(app.update);
  },
  movePlayer: () => {
    const move = app.input;
    if (app.player) {
      const position = app.player.position;
      if (move.ArrowUp === true) {
        position.x = position.x + (Math.cos(position.angle) * position.speed);
        position.y = position.y + (Math.sin(position.angle) * position.speed);
      }
      if (move.ArrowDown === true) {
        position.x = position.x - (Math.cos(position.angle) * position.speed);
        position.y = position.y - (Math.sin(position.angle) * position.speed);
      }
      if (move.ArrowLeft === true) {
        position.angle -= position.speed_rotation;
      }
      if (move.ArrowRight === true) {
        position.angle += position.speed_rotation;
      }
      if (position.x > 400) {
        position.x = 400
      }
      if (position.y > 400) {
        position.y = 400
      }
      if (position.x < 0) {
        position.x = 0
      }
      if (position.y < 0) {
        position.y = 0
      }


      app.socket.emit('updatePlayer', app.player);
    };
  },
  addListeners: () => {
    document.addEventListener('keydown', () => {
      //If it's not a document input
      if (event.currentTarget.activeElement != document.body) {
        return;
      }

      document.addEventListener('keydown', function (e) {
        app.input = (app.input || []);
        app.input[e.code] = true;
      });
      document.addEventListener('keyup', function (e) {
        app.input[e.code] = false;
      });
      // var map = {}; // You could also use an array
      // onkeydown = onkeyup = function (e) {
      //   e = e || event; // to deal with IE
      //   map[e.code] = e.type == 'keydown';
      //   /* insert conditional here */
      //   app.movePlayer(map);
      // }


      // switch(event.code){
      //   case 'KeyW' :
      //   case 'ArrowUp':
      //    app.movePlayer('moveForward');
      //     break;
      //   case 'KeyS' :
      //   case 'ArrowDown':
      //     app.movePlayer('moveBackward');
      //     break;
      //   case 'KeyA' :
      //   case 'ArrowLeft':
      //     app.movePlayer('turnLeft');
      //     break;
      //   case 'KeyD' :
      //   case 'ArrowRight':
      //     app.movePlayer('turnRight');
      //     break;
      // };
    });

  }
}

document.addEventListener('DOMContentLoaded', () => {
  //Socket.io Managment => Maybe a module later
  const socket = io("109.14.79.91:3000");

  socket.on('InitWorld', (obj) => {
    app.playerId = socket.id;
    app.socket = socket;
    app.init(obj);
  });

  socket.on('updateWorld', (obj) => {
    //! For the moment World = Players
    app.world = obj.world;
    //console.log(world);
  });
});