const Player = require("./player");

class World {
  constructor(io){
    this.io = io;
    this.settings = {
      width: 400,
      height: 400,
      refreshRate : 60,
    }
    this.players = [];
    this.init();
  }

  init(){
    this.updateWorld();
  }

  addPlayer(socket){
    this.io.emit('InitWorld',{settings:this.settings,id:socket.id});
    this.players.push(new Player(socket));
  }

  removePlayer(socket){
    const players = this.players;
    players.splice(players.indexOf(socket));
  }

  updatePlayer(obj){
    const player = this.players.find(player => player.id === obj.id);
    this.players[this.players.indexOf(player)] = obj;
  }

  updateWorld  (socket){
    console.clear();
    console.log(this.players);
    //Send world informations to client
    this.io.emit('updateWorld',{world : this.players});
    setTimeout(()=>{this.updateWorld()},this.settings.refreshRate); 
  }


}

module.exports = World;