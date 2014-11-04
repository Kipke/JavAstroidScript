var Player = function() {
	this.pos = new Vector2d(1280/2, 720/2);
	this.angle = 0;
	this.mov = new Vector2d(0,0);
	this.maxSpeed = 10;
	this.minSpeed = 0.001;
	this.accelerate = 0.25;
	this.rotateRate = (1/32) * Math.PI;		
	this.dragRate = 0.1;	
	this.fireRate = 10;
	this.charge = this.fireRate;
}

var Laser = function(position, movement, a) {
	this.pos = position;
	this.angle = a;	
	this.maxSpeed = 10;
	this.mov = movement.move(this.maxSpeed,(Math.PI *2) - this.angle);
	this.charge = 100;
}

var World = function(){
	this.player = new Player();
	this.lasers = [];	
	this.width = 1280;
	this.height = 720;
}

var Vector2d = function(x,y) {
	this.x = x;
	this.y = y;
}

Vector2d.prototype = {
	get length(){
		return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
	}
}

Vector2d.prototype.distanceTo = function (v2){
	var dx = Math.Abs(this.x - v2.x);
	var dy = Math.Abs(this.y - v2.y);
	return Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
}

Vector2d.prototype.normalize = function(){
	var l = this.length;	
	return this.scale(1/l);
}

Vector2d.prototype.rotate = function(angle, origin){
	this.translate(origin.copy().scale(-1));	
	var x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
	var y = this.y * Math.cos(angle) + this.x * Math.sin(angle);
	this.x = x;
	this.y = y;
	this.translate(origin);
	return this;
}

Vector2d.prototype.move = function(speed,angle){
	var newX = Math.sin(angle) * speed;
	var newY = Math.cos(angle) * speed;
	return this.translate(new Vector2d(newX,newY));
}

Vector2d.prototype.scale = function(factor){
	this.x *= factor;
	this.y *= factor;
	return this;
}
Vector2d.prototype.translate = function(vector){
	this.x += vector.x;
	this.y += vector.y;
	return this;
}
Vector2d.prototype.copy = function(){
	return new Vector2d(this.x, this.y);
}

var VectorList = function(vectors){
	this.vectors = vectors.map(function(v){
		return new Vector2d(v[0], v[1]);
	});
}
VectorList.prototype.apply = function(funcStr, a1, a2){
	return this.vectors.map(function(v){
		return v[funcStr](a1, a2);
	});
}

