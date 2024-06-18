const canvas = document.getElementById('canvasMain');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const gameOver = document.getElementById('gameOver');
const player = new Player(canvas.width / 2, canvas.height/ 2);
let mouse = undefined;
let pipes = [
  new Pipe(canvas.width-200)
];
let gameRunning = true;
let followMode = false;


document.addEventListener('keyup', e => {
  if (e.code === 'Space' && gameRunning) {
    player.velocity -= 10  ;
  }
})
document.addEventListener('mousedown', e => {
  if(gameRunning) followMode = true;
})
document.addEventListener('mouseup', e => {
  if(gameRunning)followMode = false;
})
document.addEventListener('mousemove', e => {
  if(gameRunning) mouse = e.clientY;
})

const pipeSpawner = () => {
  setTimeout(() => {
    pipes.push(new Pipe(canvas.width + 200, !followMode ? 200 + Math.random() * 400 : 200 + Math.random() * 200));
    if(pipes.length > 8) 
    pipes.forEach((pipe, index) => {
      if(pipe.position.x < 0) pipes.splice(index, 1);
    })
    pipeSpawner();
  }, followMode ? 800 : 1000 + (Math.random() * 9) * 100)
}
const endGame = () => {
  gameOver.style.display = 'block';
  document.getElementById('score').innerText = Math.round(player.score / 58);
  pipes.forEach((pipe) => {
    pipe.velocity = 0;
  })
  gameRunning = false;
  followMode = false;
}
const restartGame = () => {
  pipes = [];
  gameOver.style.display = 'none';
  player.score = 0;
  player.position.y = canvas.height /2;
  gameRunning = true;
}

const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0, canvas.width, canvas.height);
    pipes.forEach((pipe) => {
        pipe.update();
    })
    player.update();
}
animate();
pipeSpawner();