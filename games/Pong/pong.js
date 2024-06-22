const canvas = document.getElementById('canvasMain');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ball = new Ball(canvas.width/2, canvas.height/2);
const paddlePlayer = new Paddle(0, canvas.height / 2);
const paddleAI = new Paddle(canvas.width - paddlePlayer.dimensions.x, canvas.height / 2);

let playerOneScore = 0;
let playerTwoScore = 0;

document.addEventListener('keypress', e => {
    console.log(e)
    switch(e.key){
        case 'w':
            if(paddlePlayer.position.y > 0){
                paddlePlayer.position.y -= 90;
            }
            
            break;
        case 's':
            if(paddlePlayer.position.y + paddlePlayer.dimensions.y < canvas.height){
                paddlePlayer.position.y += 90;
            }
            break;
        case 'o':
            if(paddleAI.position.y > 0){
                paddleAI.position.y -= 90;
            }
            break;
        case 'l':
            if(paddleAI.position.y + paddleAI.dimensions.y < canvas.height){
                paddleAI.position.y += 90;
            }
            break;
    }
})


const endGame = () => {
    gameRunning = false;
    document.getElementById('gameOver').style.display = 'block';
}


const checkGameEnd = () => {

}

const animate = () => {
    ctx.clearRect(0,0,canvas.width, canvas.height)
    paddleAI.update();
    paddlePlayer.update();
    ball.update();
    requestAnimationFrame(animate);
}

animate();