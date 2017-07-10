//Requires input.js

(function() {

	//Can this sprite width and height be a series of number?

	/*
		Drifter = new Character("img/eoe.gif", {idle: idleSpriteChain, run: runSpriteChain})
	*/

	/* This is not very helpful
	function SpriteChain(width, height, dir, number) {
		this.width = width;
		this.height = height;
		this.dir = dir;
		this.number = number;
	}

	SpriteCahin.prototype.render = function (url) {
		ctx.drawImage(resources.get(url),
                          0, 0,
                          this.width, this.height,
                          0, 0,
                          this.size[0], this.size[1]))
	}

	function Character(spriteUrl, spriteChains) {
		this.spriteUrl = spriteUrl;
		this.spriteChains = spriteChains;
	}

	Character.prototype.render = function(chain) {
		this.spriteChains[chain].render(this.spriteUrl);
	}
	*/

	function Character(url, width, height, speed, frames, fps) {
		this.size = [];
		this.size.push(width);
		this.size.push(height);
		this.speed = speed;
		this.pos = {};
		this.pos.x = 0;
		this.pos.y = 0;
		this.sprite = {};
		this.sprite.url = url;
		this.animation = {};
		this.animation.frames = frames;
		this.animation.fps = fps;
		this.animation._frameIndex = 0;
	}

	Character.prototype.update = function(dt) {

		var dir = _moveMentCheck();

		if (dir.x != 0 || dir.y != 0) {
			this.animation._frameIndex += dt;
		} 
		else {
			this.animation._frameIndex = 0;
		}
		
		// console.log(this.animation._frameIndex);

		this.pos.x += dir.x * this.speed * dt / 1000;
		this.pos.y += dir.y * this.speed * dt / 1000;
	}

	Character.prototype.render = function(ctx, interp) {
		// console.log(interp);

		var currentFrame;
		var dir = _moveMentCheck();

		if (this.animation.frames > 1) {
			if (dir.x != 0 || dir.y != 0) {
				var flatIndex = Math.floor(this.animation._frameIndex / (1000 / this.animation.fps));
				console.log(flatIndex);
				currentFrame = (flatIndex % this.animation.frames);
			}
			else {
				currentFrame = 0;
			}
			
			// console.log(currentFrame);
		}

		var x = 0;
		var y = 0;
		x += currentFrame * this.size[0];

		// ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
		ctx.drawImage(resources.get(this.sprite.url),
		              x, y,
		              this.size[0], this.size[1],
		              this.pos.x, this.pos.y,
		              this.size[0], this.size[1]);
	}

	function _moveMentCheck() {

		var x = y = 0;

		if (input.isDown("RIGHT")) {
			x++;
		}
		if (input.isDown("LEFT")) {
			x--;
		}
		if (input.isDown("UP")) {
			y--;
		}
		if (input.isDown("DOWN")) {
			y++;
		}

		return {x, y};

	}

	window.Character = Character;
	
})();