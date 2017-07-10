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

// Game State Controls
var gameState;

var _Debugging = true;

// Game Loop Timing and FPS controls
var lastTick = 0;
var maxFPS = 60;
var timestep = 1000 / 60; //This basically means updates 60 times per second.
var delta = 0;

var fps = 0,
    framesThisSecond = 0,
    lastFpsUpdate = 0;

// Game Variables
var soldier,
	soldier_speed = 200;



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
    'img/moving.png',
    'img/eoe.gif',
    'img/soldier_walk.png'
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

	soldier = new Character('img/soldier_walk.png', 120, 120, 200, 6, 12);

	window.requestAnimationFrame(gameRun);
	lastTick = window.performance.now();


}

function gameRun(tick) {
	if (gameState == "GAME_RUN") {

		if (input.isDown("ENTER")) {
			gameStop();
		}

		if (tick > lastFpsUpdate + 1000) { // update every second
	        fps = 0.75 * framesThisSecond + (1 - 0.75) * fps; // compute the new FPS
	 
	        lastFpsUpdate = tick;
	        framesThisSecond = 0;
	        // if (_Debugging) console.log("FPS: " + fps);
	    }
	    
		if (tick < lastTick + (1000 / maxFPS)) {
	        window.requestAnimationFrame(gameRun);
	        return;
	    }

	    framesThisSecond++;

	    // Track the accumulated time that hasn't been simulated yet
        delta += tick - lastTick; // note += here
        lastTick = tick;
     
        // Simulate the total elapsed time in fixed-size chunks
        while (delta >= timestep) {
            update(timestep);
            delta -= timestep;
        }
	    render(delta / timestep);

	    window.requestAnimationFrame(gameRun);
	}
}

function update(dt) {
	// boxPos += boxVelocity * dt;
	// if (boxPos >= limit || boxPos <= 0) boxVelocity = -boxVelocity;
	soldier.update(dt);

}

function render(interp) {

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	soldier.render(ctx, interp);

}

function gameStop() {
	gameState = "GAME_STOP";
}

function mouseMove(event) {

}

function mouseDown(event) {

	if (_Debugging) {
		console.log("INPUT: MOUSE Down");
	}
} 

function mouseUp(event) {

	if (_Debugging) {
		console.log("INPUT: MOUSE Up");
	}

}

// var _previous_time, _pp;

function keyPress(event) {

	if (_Debugging) {
		// console.log("INPUT: KEY Code: " + event.keyCode);
	}

	switch(event.keyCode) {
		case 32:
			if (gameState == "MENU_START") {
				gameInit();
				// console.log("game Started");
			}
			else if (gameState == "GAME_RUN") {

				// These are for the testing of the speed of the object, the result is 1000 pxiel per second.
				// var now = window.performance.now();
				// var np = soldier.pos.x;
				// console.log("soldier Speed: " + (np - _pp) / (now - _previous_time) * 1000);
				// _previous_time = now;
				// _pp = np;
			}
			break;
		default:
				// console.log("Key Pressed");
			return;
	}

}













