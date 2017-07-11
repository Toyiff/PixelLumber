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

var fps = 60,
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
	ctx.fillText("Press SPACE to Start" ,canvas.width/2,canvas.height/2);	
}

function gameInit() {
	gameState = "GAME_RUN";

	soldier = new Character('img/soldier_walk.png', 120, 120, 200, 6, 12);

	lastTick = window.performance.now();
	framesThisSecond = 60;
	window.requestAnimationFrame(gameRun);
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
	        if (_Debugging) console.log("FPS: " + fps);
	    }

	    if (fps < 15) {
	    	
	    	gamePause();
	    	return;
	    }
	    
		if (tick < lastTick + (1000 / maxFPS)) {
	        window.requestAnimationFrame(gameRun);
	        return;
	    }

	    // Track the accumulated time that hasn't been simulated yet
        delta += tick - lastTick; // note += here
        lastTick = tick;
     	
        // Simulate the total elapsed time in fixed-size chunks
        var numUpdateSteps = 0;

        while (delta >= timestep) {

        	if (delta / timestep >= 180) {
        		framesThisSecond = 60;
        		panic();
        		gamePause();
        		break;
        	}

            update(timestep);
            delta -= timestep;

            if (++numUpdateSteps >= 180) {
                // panic(); // fix things
                gamePause();
                break; // bail out
            }
        }
        framesThisSecond++;
	    render(delta / timestep);

	    window.requestAnimationFrame(gameRun);
	}
}

function panic() {
	// This is when there are too many steps to simulate. One way is to pause the game.
	// [TODO] Pause the game when idle for two long;
	delta = 0;
}

function gamePause() {
	console.log("Game Paused");
	gameState = "GAME_PAUSE";
	window.requestAnimationFrame(renderPaused);
}

function gameUnPause() {
	gameState = "GAME_RUN";

	console.log("GAME STARTED AGAIN");

	lastTick = window.performance.now();
	framesThisSecond = 60;
	window.requestAnimationFrame(gameRun);
}

function update(dt) {

	// console.log("Update");
	// boxPos += boxVelocity * dt;
	// if (boxPos >= limit || boxPos <= 0) boxVelocity = -boxVelocity;
	soldier.update(dt);

}

function render(interp) {
	// console.log("Render");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	soldier.render(ctx, interp);
}

function renderPaused() {
	console.log("Rendered Game Paused");
	ctx.fillStyle = "#000000";
	ctx.globalAlpha = 0.5;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.globalAlpha = 1.0;

	ctx.font="80px Arial";
	ctx.fillStyle = "#ffffff";
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText('Press SPACE to Resume' ,canvas.width/2,canvas.height/2);
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
			} else if (gameState == "GAME_PAUSE") {
				gameState == "GAME_RUN";
				gameUnPause();
			}
			break;
		case 113: //Lowercase q
			if (gameState == "GAME_RUN") {
				gamePause();
			}
			break;
		case 81: //Capitalcase q
			if (gameState == "GAME_RUN") {
				gamePause();
			}
			break;
		default:
				console.log("Key Pressed" + event.keyCode);
			return;
	}

}













