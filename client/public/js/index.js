const app = {
  canvas: document.getElementById('canvas-world'),
  //! By the moment World = Players
  world: null,
  playerId: null,
  player: null,
  socket: null,

  lastInput: null,
  inputs: [],
  actions : [],

  latency: [],
  latencyRate: 100,
  lastPing: null,
  init: (id) => {
    app.player = id;
    app.lastPing = { Client_req: Date.now() };
    const canvas = app.canvas;
    canvas.width = 400;
    canvas.height = 400;
    app.addListeners();
    console.log('Initialisation Complete');
    app.update();
  },
  render: () => {

    const canvas = app.canvas;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 400, 400);
    if (app.latency.length === 10) {
      app.latency.forEach((ping, index) => {
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "red";
        ctx.fillStyle = null;
        ctx.moveTo(350 + (index * (5)), 400);
        ctx.lineTo(350 + (index * (5)), 400 - (ping[0]) - 1);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#00FF41";
        ctx.fillStyle = null;
        ctx.moveTo(350 + (index * (5)), 400 - (ping[0]));
        ctx.lineTo(350 + (index * (5)), 400 - (ping[0] + ping[1]));
        ctx.fill();
        ctx.stroke();

      });

    }
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
  latence: () => {
    const Client_req = Date.now();
    if (Client_req - app.lastPing.Client_req > app.latencyRate) {
      app.socket.volatile.emit('ping_request', Client_req);
      //Fake ping for local test
      //setTimeout(()=>{app.socket.volatile.emit('ping_request', Client_req);},50);
    }

    if (app.lastPing) {
      const lastPing = app.lastPing;
      const req_ping = lastPing.Server_res - lastPing.Client_req;
      const res_ping = lastPing.Client_end - lastPing.Server_res;
      const ping = [req_ping, res_ping];
      app.latency.push(ping);
      if (app.latency.length * app.latencyRate > 1000) {
        app.latency.splice(0, 1);
      }
    }

  },
  update: () => {
    app.latence();
    app.inputManager();

    //OLD Le serveur n'était pas maitre des mouvements clients.
    //const world = app.world;
    // if (world) {
    //   app.player = world.find(player => player.id === app.playerId);
    //   app.movePlayer();
    // }

    app.render();
    requestAnimationFrame(app.update);
  },
  //? movePlayer() Mouvelement localPOUR L'interpolation plus tard
  // movePlayer: () => {
  //   const move = app.input;
  //   if (app.player) {
  //     const position = app.player.position;
  //     if (move.ArrowUp === true) {
  //       position.x = position.x + (Math.cos(position.angle) * position.speed);
  //       position.y = position.y + (Math.sin(position.angle) * position.speed);
  //     }
  //     if (move.ArrowDown === true) {
  //       position.x = position.x - (Math.cos(position.angle) * position.speed);
  //       position.y = position.y - (Math.sin(position.angle) * position.speed);
  //     }
  //     if (move.ArrowLeft === true) {
  //       position.angle -= position.speed_rotation;
  //     }
  //     if (move.ArrowRight === true) {
  //       position.angle += position.speed_rotation;
  //     }
  //     if (position.x > 400) {
  //       position.x = 400
  //     }
  //     if (position.y > 400) {
  //       position.y = 400
  //     }
  //     if (position.x < 0) {
  //       position.x = 0
  //     }
  //     if (position.y < 0) {
  //       position.y = 0
  //     }
  //   };
  // },
  inputManager : ()=>{
    const action = [];
    if(app.inputs.ArrowUp || app.inputs.KeyW){
      action.push('moveForward');
    }
    if(app.inputs.ArrowDown || app.inputs.KeyS){
      action.push('moveBackward');
    }
    if(app.inputs.ArrowLeft || app.inputs.KeyA){
      action.push('turnLeft');
    }
    if(app.inputs.ArrowRight || app.inputs.KeyD){
      action.push('turnRight');
    }
    app.send(action);


  },
  addListeners: () => {
    document.addEventListener('keydown', () => {
      //If it's not a document input
      if (event.currentTarget.activeElement != document.body) {
        return;
      }

      document.addEventListener('keydown', function (e) {
        if (Date.now() - app.lastInput > 1) {
          // console.log(Date.now()-app.lastInput);
          app.lastInput = Date.now();
          app.inputs[e.code] = true;
          app.lastInput = Date.now();

        }
      });
      document.addEventListener('keyup', function (e) {
        if (Date.now() - app.lastInput > 1) {
          app.inputs[e.code] = false;
          app.lastInput = Date.now();
        }
      });
    });

  },
  send: (control) => {
    app.socket.emit('updatePlayer', { action: 'move', value: control });
  },
}

//START HERE
document.addEventListener('DOMContentLoaded', () => {
  //Socket.io Managment => Maybe a module later
  const socket = io("http://109.14.79.91:3003");
  app.socket = socket;
  socket.emit('connection', "Data?");

  socket.on('client_init', (id) => {
    app.init(id);
  })

  app.socket.on('ping_response', (obj) => {
    //Here obj = Client_now,Server_now
    obj.Client_end = Date.now();
    app.lastPing = obj;
  });


  socket.on('updateWorld', (obj) => {
    //! For the moment World = Players
    app.world = obj.world;
  });
});