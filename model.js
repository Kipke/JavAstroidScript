
var Player = function() {
	this.pos = new Vector2d(1280/2, 720/2);
	this.angle = 0;

}

var World = function(){
	this.player = new Player();
	this.width = 1280;
	this.height = 720;
}

var Vector2d = function(x,y) {
	this.x = x;
	this.y = y;
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
Vector2d.prototype.translate = function(vectorB){
	this.x += vectorB.x;
	this.y += vectorB.y;
	return this;
}
Vector2d.prototype.copy = function(){
	return new Vector2d(this.x, this.y);
};


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
