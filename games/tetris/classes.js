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

class Cell {
    constructor(x,y){
        this.position = new Vector(x, y);
    }
    draw(){ 
        console.log('g')
        ctx.rect(this.position.x, this.position.y, gridInterval, gridInterval);
        ctx.fill();
    }
    update(){
        setTimeout(() => {
            this.position.y += gridInterval;
        }, 2000)
        this.draw();
    }
}