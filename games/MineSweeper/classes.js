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

class Tile {
    constructor(x,y){
        this.position = new Vector(x,y);
        this.clicked = false;
        this.color = 'green';
        this.size = gridInterval;
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.rect(this.position.x, this.position.y, this.size, this.size)
        ctx.fill();
        ctx.closePath();
    }
    handleClicked(){
        if(this.clicked){
            this.color = 'white'
        }
    }
    update(){
        if(gameRunning){
            if (mouse.x > this.position.x && mouse.x < this.position.x + this.size &&
                mouse.y > this.position.y && mouse.y < this.position.y + this.size) {
                this.color = 'darkGreen';
            } else {
                this.color = 'green';
            }
            this.handleClicked()
        }   
        this.draw();
    }
}

class Mine extends Tile{
    constructor(x,y){
        super(x,y)
    }
    handleClicked(){
        if(this.clicked){
            this.color = 'blue'
            endGame();
        } 
    }
}