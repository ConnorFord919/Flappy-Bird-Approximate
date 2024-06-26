//Express dependancies
const express = require('express');
const app = express();
const port = 3001;

//socket.io dependancies
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
app.use(express.static('public'));

app.get('/', function(request, response) {
  response.sendFile(__dirname +'/index.html');
});

const canvas = {
  width : window.innerWidth,
  height: window.innerHeight
}

//classes
class Vector {
  constructor(x, y) {
      this.x = x;
      this.y = y;
  }
  add(otherVector){
      return new Vector(this.x + otherVector.x , this.y + otherVector.y);
  }
  addTo(otherVector){
      this.x += otherVector.x;
      this.y += otherVector.y;
  }
  subtract(otherVector) {
      return new Vector (this.x - otherVector.x, this.y - otherVector.y);
  }
  multiplyByScalar(scalar){
      return new Vector(this.x * scalar, this.y * scalar);
  }
  dotProduct(otherVector){
      return this.x * otherVector.x + this.y * otherVector.y;
  }
  length(){
      return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
  isZero(){
      if (this.x === 0 && this.y === 0) return true;
      else return false;
  }
  normalize() {
      const length = this.length();
      return new Vector(this.x / length, this.y / length);
  }
}

class Ball {
  constructor(x,y){
      this.position = new Vector(x,y);
      this.velocity = new Vector(30,-5);
      this.radius = 10;
  }
  update(){
      //game boundary collisions
      if(this.position.y - this.radius + this.velocity.y < 0 ||
          this.position.y + this.radius + this.velocity.y > canvas.height 
      ){
          this.velocity.y = -this.velocity.y;
      }
      if(this.position.x - this.radius + this.velocity.x < 0 ||
          this.position.x + this.radius + this.velocity.x > canvas.width
      ){
          endGame();
      }
      //player paddle collisions
      if(
          this.position.x - this.radius + this.velocity.x < paddlePlayer.position.x+paddlePlayer.dimensions.x &&
          this.position.y - this.radius > paddlePlayer.position.y && this.position.y + this.radius < paddlePlayer.position.y + paddlePlayer.dimensions.y
      ){
          this.velocity.x = -this.velocity.x;
      }

      //ai paddle collisions
      if(
          this.position.x + this.radius + this.velocity.x > paddleAI.position.x &&
          this.position.y - this.radius > paddleAI.position.y && this.position.y + this.radius < paddleAI.position.y + paddleAI.dimensions.y
      ){
          this.velocity.x = -this.velocity.x;
      }
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
  }
}
class Paddle {
  constructor(x,y){
      this.position = new Vector(x,y);
      this.velocity = 0;
  }
  
  update(){
      //this.position.y += this.velocity;
      this.draw()
  }
}
const paddle1 = new Paddle(100,canvas.height/2);
const paddle2 = new Paddle(canvas.width - 200, canvas.height / 2);
const ball = new Ball(canvas.width/2,canvas.height/2);
let playerOneScore = 0;
let playerTwoScore = 0;
let player = '?';
//assign player number based on number of users connected

document.addEventListener('keypress', e => {
    switch(e.key){
        case 'w':
            if(paddle1.position.y > 0){
                paddle1.position.y -= 90;
            }
            break;
        case 's':
            if(paddle1.position.y + paddle1.dimensions.y < canvas.height){
              paddle1.position.y += 90;
            }
            break;
        case 'o':
            if(paddle2.position.y > 0){
              paddle2.position.y -= 90;
            }
            break;
        case 'l':
            if(paddle2.position.y + paddle2.dimensions.y < canvas.height){
              paddle2.position.y += 90;
            }
            break;
    }
})




setInterval(() => {
    io.emit('updateGame', {x:paddle1.position.x, y:paddle1.position.y}, {x:paddle2.position.x, y:paddle2.position.y}, {x: ball.position.x, y:ball.position.y});
}, 15);


server.listen(port, function() {
  console.log('Starting server on port', port);
});