var content = document.getElementById("index-content");

var whereToArrive = window.innerHeight * 0.2;
content.style.top = window.innerHeight - content.offsetHeight;

content.style.opacity = 0;

var v = 5;

function draw(){
	// crop px
	var _top = Number(content.style.top.substring(0, content.style.top.length - 2));
	
	// speed up slowly
	if(v < 25) v *= 1.02;

	for(i = 0.01; i < 0.8; i += 0.01){
		if(_top > window.innerHeight * (1 - i)){
			content.style.opacity = 0.9;
			break;
		}
	}

	if(_top > whereToArrive){
		content.style.top = (_top - v) + 'px';
	}else{
		// stop the interval
		clearInterval(refInterval);
	}
}

var refInterval = setInterval(draw, 10);