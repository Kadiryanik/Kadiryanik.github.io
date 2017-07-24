class Vec{
	constructor(x = 0, y = 0){
		this.x = x;
		this.y = y;
	}
}

class Circle{
	constructor(x, y, r){
		this.pos = new Vec(x, y);
		this.radius = r;
	}
	get left(){
		return this.pos.x - this.radius / 2;
	}
	get right(){
		return this.pos.x + this.radius / 2;
	}
	get top(){
		return this.pos.y - this.radius / 2;
	}
	get bottom(){
		return this.pos.y + this.radius / 2;
	}
}

class Ball extends Circle{
	constructor(x, y){
		super(x, y, 20);
		this.vel = new Vec;
		this.falling = true;
	}
}

class Game{
	constructor(canvas, speed){
		this._canvas = canvas;
		this._context = canvas.getContext("2d");

		this._ball = new Ball(240, 100);

		let lastTime;
		const callback = (millis) => {
			if(lastTime){
				// convert second (/ 1000)
				this.update((millis - lastTime) / 1000);
			}
			lastTime = millis;
			requestAnimationFrame(callback); 
		};
		callback();
	}
	draw(ball){
		this._context.fillStyle = '#fff';
		this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

		// Set drawing color
		this._context.fillStyle = '#000';

		// Draw Ball
		this._context.beginPath();
		this._context.arc(ball.pos.x, ball.pos.y, ball.radius, 0, 2 * Math.PI);
		this._context.fill();

		this._context.fillStyle = "rgb(60, 200, 180)";
		this._context.font = "24px Helvetica";
		this._context.textAlign = "left";
		this._context.textBaseline = "top";
		this._context.fillText("Speed: " + (this._ball.vel.y).toFixed(2), 200, 16);
		this._context.fillText("Height: " + (this._canvas.height - this._ball.pos.y - this._ball.radius).toFixed(2), 10, 16);
	}
	update(delta){
		if(this._ball.falling){
			this._ball.vel.y *= 1.01;
			this._ball.pos.y += this._ball.vel.y * delta;
			if(this._ball.pos.y + this._ball.radius + 1 > this._canvas.height &&
				this._ball.vel.y < 10){
				this._ball.vel.y = 0;
				this._ball.pos.y = this._canvas.height - this._ball.radius;
			}
		}
		
		if(!(this._ball.falling)){
			this._ball.vel.y *= 0.99;
			this._ball.pos.y += this._ball.vel.y * delta;
			if(this._ball.vel.y > -3){
				this._ball.falling = true;
				this._ball.vel.y = 5;
			}
		}
		
		this.collision(this._ball);
		// Draw objects
		this.draw(this._ball);
	}
	collision(ball){
		if(this._canvas.height < ball.pos.y + ball.radius){
			ball.falling = false;
			ball.vel.y = -ball.vel.y * 0.40;
			ball.pos.y = this._canvas.height - ball.radius;
		}
	}
	start(){
		if(this._ball.vel.x === 0 && this._ball.vel.y === 0){
			this._ball.vel.x = 0;
			this._ball.vel.y = speed;
		}
	}
}

const canvas = document.getElementById("game");
canvas.style.display= 'block';
canvas.style.margin = "auto";

const speed = 100;
const game = new Game(canvas, speed);

canvas.addEventListener('click', event => {
	game.start();
});