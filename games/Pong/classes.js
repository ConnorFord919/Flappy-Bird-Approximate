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
        this.color = 'blue';
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();
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
        this.draw();
    }
}
class Paddle {
    constructor(x,y){
        this.position = new Vector(x,y);
        this.velocity = 0;
        this.dimensions = new Vector(40, 500);
    }
    draw(){
        ctx.beginPath();
        ctx.rect(this.position.x, this.position.y, this.dimensions.x, this.dimensions.y);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.closePath();
    }
    update(){
        //this.position.y += this.velocity;
        this.draw()
    }
}