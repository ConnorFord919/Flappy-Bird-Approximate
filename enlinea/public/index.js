const canvas = document.getElementById('canvasMain');
const ctx = canvas.getContext('2d');
const socket = io();
const paddleWidth = 40;
const paddleHeight = 500;
const ballRadius = 10;
const color = 'red';

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



const drawPaddle = (x,y) => {
    ctx.beginPath();
    ctx.rect(x, y, paddleWidth, paddleHeight);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
}

const drawBall = (x,y) => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
}


socket.on('updateGame', (p1, p2, ball) => {
    ctx.clearRect(0, 0, playArea.width, playArea.height);
    drawPaddle(p1.x, p1.x);
    drawPaddle(p2.x, p2.y);
    drawBall(ball.x, ball.y);
})