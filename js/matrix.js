var canvas = document.getElementById("canvas-matrix");
var ctx = canvas.getContext("2d");

// Making the canvas full screen
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var font_size = 9;

// Charecter set
var text = "0123456789ABCDEF";
text = text.split("");

//number of columns for the rain
var columns = canvas.width / font_size;

//an array of drops - one per column
var drops = [];

//x below is the x coordinate
for(var x = 0; x < columns; x++)
	drops[x] = 1;

function draw(){
	// This way to shows last frames
	ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Green text	
	ctx.fillStyle = "#0F0";
	ctx.font = font_size + "px arial";
	
	// Column control
	for(var i = 0; i < drops.length; i++){
		// Random character in text to print
		var character = text[Math.floor(Math.random() * text.length)];

		// Print charecter to screen
		ctx.fillText(character, i * font_size, drops[i] * font_size);
		 
		if(drops[i] * font_size > canvas.height && Math.random() > 0.985)
			drops[i] = 0;
		
		// Increment column index
		drops[i]++;
	}
}

setInterval(draw, 35);
