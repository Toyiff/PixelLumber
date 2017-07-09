// Use this to wait for other parts of the website to load
// window.onload = function() {}
window.requestAnimationFrame = (function(){
    return window.requestAnimationFrame    ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1280;
canvas.height = 800;
document.body.appendChild(canvas);
canvas.focus();

canvas.addEventListener('mousemove', mouseMove, false);  
canvas.addEventListener("mousedown", mouseDown, false);  
canvas.addEventListener('mouseup',   mouseUp, false); 
document.addEventListener('keypress',  keyPress, false); 

//Game State Controls
var gameState;

var _Debugging = true;

var lastTick = 0;
var maxFPS = 60;
var timestep = 1000 / 60;
var delta = 0;

//Game States:
/*
Loading screen: 0

*/

// Game Variables

	var boxPos = 10, boxVelocity = 0.2, limit = 300;

init();

function init() {
	ctx.font="100px Arial";
	ctx.fillStyle="#000000";
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText("Loading" ,canvas.width/2,canvas.height/2);

	gameState = "LOADING";
}

resources.load([
    'img/idle.png', 
    'img/moving.png'
]);
resources.onReady(menuStart);

function menuStart() {

	gameState = "MENU_START";

	ctx.fillStyle="#AAAAFF";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.font="80px Arial";
	ctx.fillStyle="#000000";
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText("Press Space to Start" ,canvas.width/2,canvas.height/2);	
}

function gameInit() {
	gameState = "GAME_RUN";
	window.requestAnimationFrame(gameRun);
	lastTick = window.performance.now();
}

function gameRun(tick) {
	if (gameState == "GAME_RUN") {

		if (input.isDown("ENTER")) {
			gameStop();
		}

		if (tick < lastTick + (1000 / maxFPS)) {
			
	        window.requestAnimationFrame(gameRun);
	        return;
	    }

	    // Track the accumulated time that hasn't been simulated yet
        delta += tick - lastTick; // note += here
        lastTick = tick;
     
        // Simulate the total elapsed time in fixed-size chunks
        while (delta >= timestep) {
            update(timestep);
            delta -= timestep;
        }
	    render();
	    lastTick = tick;

	    window.requestAnimationFrame(gameRun);
	}
}

function update(dt) {
	boxPos += boxVelocity * dt;
	// Switch directions if we go too far
	if (boxPos >= limit || boxPos <= 0) boxVelocity = -boxVelocity;
}

function render() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#000000";
	ctx.fillRect(boxPos, 10, 100, 100);

}

function gameStop() {
	gameState = "GAME_STOP";
}

function mouseMove(event) {

}

function mouseDown(event) {

	if (_Debugging) {
		console.log("mouseDown");
	}
} 

function mouseUp(event) {

	if (_Debugging) {
		console.log("mouseUp");
	}

}

function keyPress(event) {

	if (_Debugging) {
		console.log("keyPressed, keyCode: " + event.keyCode);
	}

	switch(event.keyCode) {
		case 32:
			if (gameState == "MENU_START") {
				gameInit();
				// console.log("game Started");
			}
			break;
		default:
				// console.log("Key Pressed");
			return;
	}

}













