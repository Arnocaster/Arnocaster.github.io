class Player {
  #socket;
  constructor(socket){
    this.#socket = socket;
    this.id = socket.id;
    this.position = {
      x : parseInt(Math.random()*400),
      y : parseInt(Math.random()*400),
      angle : Math.PI,
      speed : 1,
      speed_rotation : 0.1,
    }
    this.color = `rgb(${Math.random()*255}, ${Math.random()*255},${Math.random()*255})`
  }
}

module.exports = Player;
