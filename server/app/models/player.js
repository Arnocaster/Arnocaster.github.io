class Player {
  #socket;
  constructor(socket){
    this.#socket = socket;
    this.id = socket.id;
    this.position = {
      x : parseInt(Math.random()*400),
      y : parseInt(Math.random()*400),
      angle : parseInt(Math.PI),
    }
  }
}

module.exports = Player;
