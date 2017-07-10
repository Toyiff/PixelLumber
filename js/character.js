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

	function Character(width, height, speed) {
		this.width = width;
		this.height = height;
		this.speed = speed;
		this.pos = {};
		this.pos.x = 0;
		this.pos.y = 0;
	}

	Character.prototype.update = function(dt) {

		dir = _moveMentCheck();

		this.pos.x += dir.x * this.speed * dt / 1000;
		this.pos.y += dir.y * this.speed * dt / 1000;
	}

	Character.prototype.render = function() {
		ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
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