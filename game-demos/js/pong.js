class Vec{
	constructor(x = 0, y = 0){
		this.x = x;
		this.y = y;
	}
}

class Rect{
	constructor(w, h){
		this.pos = new Vec;
		this.size = new Vec(w, h);
	}
	get left(){
		return this.pos.x - this.size.x / 2;
	}
	get right(){
		return this.pos.x + this.size.x / 2;
	}
	get top(){
		return this.pos.y - this.size.y / 2;
	}
	get bottom(){
		return this.pos.y + this.size.y / 2;
	}
}

class Circle{
	constructor(r){
		this.pos = new Vec;
		this.size = new Vec(r);
	}
	get left(){
		return this.pos.x - this.size.x / 2;
	}
	get right(){
		return this.pos.x + this.size.x / 2;
	}
	get top(){
		return this.pos.y - this.size.x / 2;
	}
	get bottom(){
		return this.pos.y + this.size.x / 2;
	}
}

class Player extends Rect{
	constructor(){
		super(20, 100);
		this._score = 0;
	}
}

class Ball extends Circle{
	constructor(){
		super(5);
		this.vel = new Vec;
	}
}

class Game{
	constructor(canvas, speed){
		this._canvas = canvas;
		this._context = canvas.getContext("2d");

		this._ball = new Ball;
		this._ball.pos.x = this._canvas.width / 2;
		this._ball.pos.y = this._canvas.height / 2;

		this._ball.vel.x = speed;
		this._ball.vel.y = speed;
	
		this._players = [
			new Player,
			new Player
		];

		this._players[0].pos.x = 30;
		this._players[1].pos.x = this._canvas.width - 30;
		
		this._players[0].pos.y = this._canvas.height / 2;
		this._players[1].pos.y = this._canvas.height / 2;


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

		this.reset();
	}
	draw(ball, p1, p2){
		this._context.fillStyle = '#fff';
		this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

		// Set drawing color
		this._context.fillStyle = '#000';

		// Draw Ball
		this._context.beginPath();
		this._context.arc(ball.pos.x, ball.pos.y, ball.size.x, 0, 2 * Math.PI);
		this._context.fill();

		this._context.fillRect(p1.left, p1.top, p1.size.x, p1.size.y);
		this._context.fillRect(p2.left, p2.top, p2.size.x, p2.size.y);
	}
	update(delta){
		this._ball.pos.x += this._ball.vel.x * delta;
		this._ball.pos.y += this._ball.vel.y * delta;

		if(this._ball.left < 0 || this._ball.right > this._canvas.width){
			this._ball.vel.x = -this._ball.vel.x;
		}
		if(this._ball.top < 0 || this._ball.bottom > this._canvas.height){
			this._ball.vel.y = -this._ball.vel.y; 
		}
		// Computer follows to ball
		this._players[1].pos.y = this._ball.pos.y;

		// Collision detect
		this._players.forEach(player => this.collision(this._ball, player));

		// Draw objects
		this.draw(this._ball, this._players[0], this._players[1]);
	}
	collision(ball, player){
		// Ball passed players and collision with wall
		if(ball.left < 20 || ball.right > this._canvas.width - 20){
			this.reset();
		}

		if(player.left < ball.right && player.right > ball.left &&
			player.top < ball.bottom && player.bottom > ball.top){
			ball.vel.x = -ball.vel.x;
		}
	}
	reset(){
		this._ball.pos.x = this._canvas.width / 2;
		this._ball.pos.y = this._canvas.height / 2;
		this._ball.vel.x = 0;
		this._ball.vel.y = 0;
	}
	start(){
		if(this._ball.vel.x === 0 && this._ball.vel.y === 0){
			this._ball.vel.x = speed;
			this._ball.vel.y = speed;
		}
	}
}
 
const canvas = document.getElementById("game");
canvas.style.display= 'block';
canvas.style.margin = "auto";

const speed = 300;
const game = new Game(canvas, speed);

canvas.addEventListener('mousemove', event => {
	game._players[0].pos.y = event.offsetY;
});

canvas.addEventListener('click', event => {
	game.start();
});