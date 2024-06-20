const canvas = document.getElementById('canvasMain');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let playerOneScore = 0;
let playerTwoScore = 0;

document.addEventListener('keypress', e => {
    console.log(e)
    switch(e){
        case e.key === 'w':
            
            
            break;
        case e.key === 's':

            break;
    }
})


const endGame = () => {
    gameRunning = false;
    document.getElementById('gameOver').style.display = 'block';
}

const init = () => {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < canvas.width / gridInterval; j++) {
            grid[i].push('');
        }
    }
    spawnBlock();
}

const checkGameEnd = () => {

}

const animate = () => {
    ctx.clearRect(0,0,canvas.width, canvas.height)

    requestAnimationFrame(animate);
}

animate();
init();