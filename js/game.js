// Use this to wait for other parts of the website to load
// window.onload = function() {}
var requestAnimFrame = (function(){
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

//Game States:
/*
Loading screen: 0

*/

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

function gameRun() {
	gameState = "GAME_RUN";
	ctx.fillStyle="#000000";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
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
				gameRun();
				// console.log("game Started");
			}
			break;
		default:
				// console.log("Key Pressed");
			return;
	}

}













