// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 300;
canvas.style.display= 'block';
canvas.style.margin = "auto";

document.body.appendChild(canvas);

// Monkey image
var monkeyReady = false;
var monkeyImage = new Image();
monkeyImage.onload = function () {
	monkeyReady = true;
};
monkeyImage.src = "images/monkey_32x32.png";

// food image
var foodReady = false;
var foodImage = new Image();
foodImage.onload = function () {
	foodReady = true;
};
foodImage.src = "images/food_16x16.png";

// Game objects
var monkey = {
	speed: 200 // movement in pixels per second
};
var food = {};
var eatenFoodCounter = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// New food when eaten
var newFood = function () {
	// Throw the food somewhere on the screen randomly
	food.x = 16 + (Math.random() * (canvas.width - 32));
	food.y = 16 + (Math.random() * (canvas.height - 32));
};

// Keys
var keyLeft = 37;
var keyUp = 38;
var keyRight = 39;
var keyDown = 40;
var keyD = 68;
var keyU = 85;

// Update game objects
update = function (modifier) {
	if (keyUp in keysDown) {
		// 1 for rectangle
		if (monkey.y > 1){
			monkey.y -= monkey.speed * modifier;
		}
	}
	if (keyDown in keysDown) {
		// Monkey size 32 and 1 for rectangle
		if(monkey.y < canvas.height - 33){
			monkey.y += monkey.speed * modifier;
		}
	}
	if (keyLeft in keysDown) {
		if(monkey.x > 1){
			monkey.x -= monkey.speed * modifier;
		}
	}
	if (keyRight in keysDown) {
		if(monkey.x < canvas.width - 33){
			monkey.x += monkey.speed * modifier;
		}
	}
	if (keyU in keysDown) {
		monkey.speed++;
	}
	if (keyD in keysDown) {
		monkey.speed--;
	}


	// Collision
	if (
		monkey.x <= (food.x + 20)
		&& food.x <= (monkey.x + 20)
		&& monkey.y <= (food.y + 20)
		&& food.y <= (monkey.y + 20)
	) {
		++eatenFoodCounter;
		newFood();
	}
};

// Draw everything
render = function () {
	// Clearing canvas for new frame
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw a rectangle around the canvas
	ctx.rect(1, 1, canvas.width - 2, canvas.height - 2);
	ctx.stroke();
	
	if (monkeyReady) {
		ctx.drawImage(monkeyImage, monkey.x, monkey.y);
	}

	if (foodReady) {
		ctx.drawImage(foodImage, food.x, food.y);
	}

	// Score
	ctx.fillStyle = "rgb(60, 200, 180)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Eated: " + eatenFoodCounter, 32, 16);
	ctx.fillText("Speed: " + monkey.speed, 350, 16);
};

// The main game loop
var main = function() {
var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Start process
var then = Date.now();

newFood();

monkey.x = canvas.width / 2;
monkey.y = canvas.height / 2;

main();