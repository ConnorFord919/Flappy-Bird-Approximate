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

class Player {
    constructor(){
        this.position = new Vector(canvas.width/2, canvas.height/2)
        this.velocity = 0;
        this.color = 'red';
        this.radius = 15;
        this.velocityLimit = {min : -5, max: 20}
        this.score = 0;
        this.sprite = document.getElementById("allahMode");
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, this.position.y, this.radius, 0, Math.PI * 2, false);
        //ctx.drawImage(this.sprite, this.position.x, this.position.y);
        ctx.fill();
        ctx.stroke()
        ctx.closePath();
    }
    update(){
        if(this.position.y + 20 + this.velocity > canvas.height) this.velocity = - this.velocity * 0.7
        if(Math.abs(this.velocity) > this.velocityLimit.max){
            this.velocity = -this.velocityLimit.max;
        } 
        if(this.velocity < this.velocityLimit.min) this.velocity = this.velocityLimit.min;
        if(followMode) player.position.y = mouse;
        else{
            this.position.y += this.velocity;
            this.velocity += 0.07 
        }
        this.draw();
    }
}
class Pipe {
    constructor(x, gap){
        this.velocity = 3;
        this.position = new Vector(x, canvas.height / 2)
        this.width = 100;
        this.color = 'green';
        this.gap = gap;
        this.center = Math.random() * 800;
        this.sprite = document.getElementById("target");
    }   
    draw(){
        console.log()
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.rect(this.position.x, 0, this.width, canvas.height);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = 'white'
        ctx.rect(this.position.x - this.velocity, this.center-this.gap/2, this.width+this.velocity*2, this.gap)
        ctx.fill();
        ctx.closePath();

    }
    update(){
        if(followMode){
            this.velocity = 7;
        } 
        this.position.x -= this.velocity;
        if(
            player.position.x + player.radius > this.position.x &&
            player.position.x  < this.position.x + this.width
        ){
            if(gameRunning){
                player.score ++;
            } 
            if(
                player.position.y - player.radius < this.center - this.gap/2 ||
                player.position.y + player.radius > this.center + this.gap/2
            ){
                endGame();
                player.velocity = 0;
            } 
             
        }
        this.draw()
    }
    
}