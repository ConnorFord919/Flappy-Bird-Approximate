const canvas = document.getElementById('canvasMain');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 800;
const gridInterval = 50;
const grid = Array.from({ length: canvas.height / gridInterval }, () => []);
//const fallSpeed = 0.05;
const spawnPoint = {x: (canvas.width / gridInterval)/2, y: 1}
const blocks = [
    function straightLine (){
        grid[spawnPoint.y-1][spawnPoint.x] = 'x';
        grid[spawnPoint.y][spawnPoint.x] = 'x';
        grid[spawnPoint.y+1][spawnPoint.x] = 'x';
    },

]
let score = 0;


canvas.addEventListener('mousedown', e => {

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
//loop through each row
//if all in row are equal overwrite whole row

//Loop is iterating until failure


const checkRow = (i) => {
    if(
        grid[i][0] === '*' &&
        grid[i][1] === '*' &&
        grid[i][2] === '*' &&
        grid[i][3] === '*' &&
        grid[i][4] === '*' &&
        grid[i][5] === '*' &&
        grid[i][6] === '*' &&
        grid[i][7] === '*' &&
        grid[i][8] === '*' &&
        grid[i][9] === '*' 
    ){
        score ++;
        for(let j = 0; j < grid[i].length; j ++){
            grid[i][j] = '';
        }
    }
}

const checkGameEnd = () => {

}
const spawnBlock = () => {
    //const block = blockTypes[Math.random() * blockTypes.length - 1];
    blocks[0]();
}
setInterval(() => {
    for (let i = (canvas.height / gridInterval) - 2; i >= 0; i--) { 
        checkRow(canvas.height/gridInterval-1)
        checkRow(i)
        for (let j = 0; j < (canvas.width / gridInterval); j++) {
            if (grid[i][j] === 'x') {
                if(grid[i + 1][j] !== 'x' && grid[i + 1][j] !== '*'){
                    grid[i][j] = '';
                    if (i < (canvas.height / gridInterval) - 1) {
                        grid[i + 1][j] = 'x';
                    }
                    else grid[i][j] = '*';
                }   
                else grid[i][j] = '*';
            }
        }
    }
    console.log(grid)
}, 1000)

const animate = () => {
    checkGameEnd();
    document.getElementById('displayScore').innerText = `Score: ${score}`;
    ctx.clearRect(0,0,canvas.width, canvas.height)
    for (let i = 0; i < grid.length; i ++) {
        for(let j = 0; j < grid[i].length; j ++){
            if(grid[i][j] === ''){
                ctx.fillStyle = 'white'
            }
            else {
                ctx.fillStyle = 'blue'
            }
            ctx.beginPath()
            ctx.rect(j*gridInterval, i*gridInterval, gridInterval, gridInterval);
            ctx.fill();
            ctx.closePath()
        }
    }
    requestAnimationFrame(animate);
}





//spawnBlock();
animate();
init();


//map array onto visible grid
//then its mad ez tbh lmaoski sigma rizz skibidi toilet