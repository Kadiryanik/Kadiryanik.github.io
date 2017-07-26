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
	constructor(x, y, c, r){
		super(x, y, r);
		this.vel = new Vec;
		this.falling = true;
		this.color = c;
	}
}

class Game{
	constructor(canvas, speed){
		this._canvas = canvas;
		this._context = canvas.getContext("2d");

		this._balls = [];

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
	draw(){
		this._context.fillStyle = '#fff';
		this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
	}
	updateAll(ball, delta){
		if(ball.falling){
			ball.vel.y *= 1.2;
			ball.pos.y += ball.vel.y * delta;
			if(ball.pos.y + ball.radius + 1 > this._canvas.height &&
				ball.vel.y < 60){
				ball.vel.y = 0;
				ball.pos.y = this._canvas.height - ball.radius;
			}
		}
		
		if(!(ball.falling)){
			ball.vel.y *= 0.80;
			ball.pos.y += ball.vel.y * delta;
			if(ball.vel.y > -20){
				ball.falling = true;
				ball.vel.y = 30;
			}
		}

		ball.pos.x += ball.vel.x;

		// collision
		if(this._canvas.height < ball.pos.y + ball.radius){
			ball.falling = false;
			ball.vel.y = -ball.vel.y * 0.90;
			ball.pos.y = this._canvas.height - ball.radius;
		}
		if(this._canvas.width < ball.pos.x + ball.radius || 0 > ball.pos.x - ball.radius){
			ball.vel.x = -ball.vel.x;
		}
		
		// Set drawing color
		this._context.fillStyle = ball.color;
		// Draw balls
		this._context.beginPath();
		this._context.arc(ball.pos.x, ball.pos.y, ball.radius, 0, 2 * Math.PI);
		this._context.fill();
	}
	update(delta){
		// Draw objects
		this.draw();
		this._balls.forEach(ball => this.updateAll(ball, delta));
	}
	start(ball){
		if(ball.vel.x === 0 && ball.vel.y === 0){
			ball.vel.x = (Math.random() * 10) - 5; // +-5
			ball.vel.y = speed;
		}
	}
}

const canvas = document.getElementById("game");
canvas.style.display= 'block';
canvas.style.margin = "auto";

const speed = 100;
const game = new Game(canvas, speed);

for (var i = 0; i < 100; i++) {
	game._balls.push(new Ball(Math.random() * game._canvas.width, 
							  Math.random() * game._canvas.height, 
							  '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6),
							  5 + (Math.random() * 30)));
}

canvas.addEventListener('click', event => {
	game._balls.forEach(ball => game.start(ball));
});