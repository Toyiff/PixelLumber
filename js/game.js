window.onload = function() {
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	canvas.width = 1280;
	canvas.height = 800;
	document.body.appendChild(canvas);
	canvas.focus();

	ctx.fillStyle = "rgb(0,255,255)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}