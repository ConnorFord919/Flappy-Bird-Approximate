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
        currentCenter = {row: spawnPoint.y, col: spawnPoint.x };
        grid[spawnPoint.y-1][spawnPoint.x] = 'x';
        grid[spawnPoint.y][spawnPoint.x] = 'x';
        grid[spawnPoint.y+1][spawnPoint.x] = 'x';
        grid[spawnPoint.y+2][spawnPoint.x] = 'x';
    },
]
let score = 0;
let currentCenter;

const shiftDown = (row, col) => {
    currentCenter = {row: row, col: col}
    grid[row][col] = '';
    grid[row+1][col] = 'x';
}

document.addEventListener('keypress', e => {
    switch(e.code){
        case 'KeyR': 
            rotateBlock();
            break;

        case 'KeyD':
            for (let i = 0; i < grid.length; i++) {
                for (let j = (canvas.width/gridInterval) - 1; j >= 0; j--) {
                    if(grid[i][j] === 'x' && grid[i][j+1] !== 'x' && grid[i][j+1] !== '*' && j !== canvas.width / gridInterval-1){
                        grid[i][j] = '';
                        grid[i][j+1] = 'x';
                    } 
                }
            }
            break;
        
        case 'KeyA':
            for (let i = 0; i < grid.length; i++) {
                for (let j = 0; j < canvas.width / gridInterval; j++) {
                    if(grid[i][j] === 'x' && grid[i][j-1] !== 'x' && grid[i][j+1] !== '*' && j !== 0){
                        grid[i][j] = '';
                        grid[i][j-1] = 'x';
                    } 
                }
            }
            break;
        
        case 'KeyS':
            for (let i = (canvas.height / gridInterval) - 1; i >= 0; i--) { 
                for (let j = 0; j < canvas.width / gridInterval; j++) {
                    if(grid[i][j] === 'x' && grid[i+1][j] !== '*'){
                        shiftDown(i,j);
                    } 
                }
            }
            break;

    }
})

const rotateBlock = () => {
    const positions = [];
    const gridCopy = [...grid];
    //Take a 5x5 or so chunk out of the grid as a copy 
    //Do matrix math on this smaller chunk 
    //somehow smack the 5x5 or so chunk in the copy arr then look for x pos
    //place at x pos found
    /*
    

    const N = 3;
    
    // Function to rotate the matrix 90 degree clockwise
    function rotate90Clockwise(a) {
    
        // Traverse each cycle
        for (let i = 0; i < N / 2; i++) {
            for (let j = i; j < N - i - 1; j++) {
            
                // Swap elements of each cycle
                // in clockwise direction
                let temp = a[i][j];
                a[i][j] = a[N - 1 - j][i];
                a[N - 1 - j][i] = a[N - 1 - i][N - 1 - j];
                a[N - 1 - i][N - 1 - j] = a[j][N - 1 - i];
                a[j][N - 1 - i] = temp;
            }
        }
    }*/
    
    const matrixSquare = [];
    for(let i = currentCenter.row - 3; i < currentCenter.row + 3; i++){
        matrixSquare.push(gridCopy[i]);
        for(let j = currentCenter.col - 3; j < currentCenter.col + 3; j++){
            matrixSquare.push(matrixSquare[j]);
        }
    }
    console.log(matrixSquare)
    for (let i = 0; i < gridCopy.length; i++) {
        for (let j = 0; j < gridCopy[i].length; j++) {
            if(grid[i][j] === 'x' ) positions.push({row: i, col: j});
        }
    }
    clearGrid();
    positions.forEach((position) => {
        grid[position.row][position.col] = 'x';
    })
}
const clearGrid = () => {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if(grid[i][j] === 'x') grid[i][j] = '';
        }
    }
}

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
    let newPiece = true;
    for (let i = (canvas.height / gridInterval) - 1; i >= 0; i--) { 
        checkRow(i)
        for (let j = 0; j < (canvas.width / gridInterval); j++) {
            if (grid[i][j] === 'x') {
                newPiece = false;
                if(i !== canvas.height / gridInterval-1 && grid[i + 1][j] !== 'x' && grid[i + 1][j] !== '*'){
                    grid[i][j] = '';
                    if (i < (canvas.height / gridInterval) - 1) {
                        shiftDown(i,j);
                    }
                    else grid[i][j] = '*';
                }   
                else grid[i][j] = '*';
            }else if(grid[i][j] === '*'){
                if(i !== canvas.height / gridInterval-1 && grid[i + 1][j] !== '*'){
                    grid[i][j] = '';
                    grid[i+1][j] = '*';
                }
            }
        }
    }
    if(newPiece) spawnBlock();
    console.log(currentCenter)
}, 200)

const animate = () => {
    checkGameEnd();
    document.getElementById('displayScore').innerText = `Score: ${score}`;
    ctx.clearRect(0,0,canvas.width, canvas.height)
    for (let i = 0; i < grid.length; i ++) {
        for(let j = 0; j < grid[i].length; j ++){
            if(grid[i][j] === ''){
                ctx.fillStyle = 'white'
                ctx.strokeStyle = 'white'
            }
            else {
                ctx.fillStyle = 'blue'
                ctx.strokeStyle = 'black'
            }
            ctx.beginPath()
            ctx.lineWidth = 3;
            ctx.rect(j*gridInterval, i*gridInterval, gridInterval, gridInterval);
            ctx.stroke()
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