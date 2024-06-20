const canvas = document.getElementById('canvasMain');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;
const gridInterval = 50;
const grid = Array.from({ length: canvas.height / gridInterval }, () => []);
const mouse = {
    x: undefined,
    y: undefined
};
let gameRunning = true;
let firstMine = true;

canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

canvas.addEventListener('mousedown', e => {
    const index = {x:  Math.floor(mouse.x / gridInterval), y: Math.floor(mouse.y / gridInterval)};
    if(firstMine){
        firstClick(index)
    }
    console.log(grid)
    grid[index.y][index.x].clicked = true;
    firstMine = false;
})

const endGame = () => {
    gameRunning = false;
    document.getElementById('gameOver').style.display = 'block';
    for (let i = 0; i < grid.length; i ++) {
        for(let j of grid[i]){
            j.clicked = true;
        }
    }
}

const firstClick = (index) => {
    grid[index.y+1][index.x].clicked = true;
    grid[index.y-1][index.x].clicked = true;
    grid[index.y][index.x+1].clicked = true;
    grid[index.y][index.x-1].clicked = true;
    grid[index.y-1][index.x-1].clicked = true;
    grid[index.y+1][index.x+1].clicked = true;
    grid[index.y+1][index.x+1].clicked = true;
    grid[index.y-1][index.x+1].clicked = true;
    grid[index.y+1][index.x-1].clicked = true;
    for (let i = 0; i < grid.length; i ++) {
        for(let j = 0; j < grid[i].length; j ++){
            const tipper = Math.random() * 15;
            if(!grid[i][j].clicked && tipper < 5){
                grid[i][j] = new Mine(j * gridInterval, i * gridInterval)
            }
        }
    }
}
const init = () => {    
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < canvas.width / gridInterval; j++) {
            grid[i].push(new Tile(j * gridInterval, i * gridInterval));
        }
    }
    animate();
}
const animate = () => {
    ctx.clearRect(0,0,canvas.width, canvas.height)
    for (let i = 0; i < grid.length; i ++) {
        for(let j of grid[i]){
            j.update();
        }
    }
    requestAnimationFrame(animate);
}
init();