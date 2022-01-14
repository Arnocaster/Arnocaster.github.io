const Player = require("./player");

class World {
  constructor(io){
    this.io = io;
    this.info = {
      width: 400,
      height: 400,
      refreshRate : 1000,
    }
    this.players = [];
    this.init();
  }

  init(){
   
    this.updateWorld();
  }

  addPlayer(socket){
    this.io.emit('InitWorld',this.info);
    this.players.push(new Player(socket));
  }

  removePlayer(socket){
    const players = this.players;
    players.splice(players.indexOf(socket));
  }

  updatePlayer(socket){
    
  }

  updateWorld  (socket){
    console.clear();
    console.log(this.players);
    //Send world informations to client
    this.io.emit('updateWorld',this.players);
    setTimeout(()=>{this.updateWorld()},this.info.refreshRate); 
  }


}

module.exports = World;