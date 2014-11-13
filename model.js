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

var Asteroid = function(position,dir,size){
	this.pos = position;
	this.angle = dir;
	this.maxSpeed = 2;
	var x = Math.cos(dir) * this.maxSpeed;
	var y = Math.sin(dir) * this.maxSpeed;
	this.mov = new Vector2d(x,y);	

	this.size = size;
	var t = shapePicker(size);
	this.scale = t[1];
	this.model = t[0];	

}

var shapePicker = function(size){

	// get a random number between 0 and 9
	var r = Math.floor(Math.random() * 9);

	var shapes = 
	[[[-32, 35] , [ -4, 32] , [ 24, 38] , [ 38, 23] , [ 31, -4] , [ 38,-25] , [ 14,-39] , [-28,-31] , [-39,-16] , [-31,  4] , [-38, 22]],
	 [[-39,-25] , [-33, -8] , [-38, 21] , [-23, 25] , [-13, 39] , [ 24, 34] , [ 38,  7] , [ 33,-15] , [ 38,-31] , [ 16,-39] , [ -4,-34] , [-16,-39]],
	 [[ 12,-39] , [ -2,-26] , [-28,-37] , [-38,-14] , [-21,  9] , [-34, 34] , [ -6, 38] , [ 35, 23] , [ 21,-14] , [ 36,-25]],
	 [[  9,-19] , [ 18, -8] , [  7,  0] , [ 15, 15] , [ -7, 13] , [-16, 17] , [-18,  3] , [-13, -6] , [-16,-17]]	,
	 [[ -7,-19] , [-19,-15] , [-12, -5] , [-19,  0] , [-19, 13] , [ -9, 19] , [ 12, 16] , [ 18, 11] , [ 13,  6] , [ 19, -1] , [ 16,-17]],
	 [[  2, 18] , [ 18, 10] , [  8,  0] , [ 18,-13] , [  6,-18] , [-17,-14] , [-10, -3] , [-13, 15]],
	 [[ -6,  8] , [  1,  4] , [  8,  7] , [ 10, -1] , [  4,-10] , [ -8, -6] , [ -4, 0]],
	 [[ -8, -9] , [ -5, -2] , [ -8,  5] , [  6,  8] , [  9,  6] , [  7, -3] , [ 9,  -9] , [  0, -7]],
	 [[ -8, -8] , [ -5, -1] , [ -8,  3] , [  0,  9] , [  8,  4] , [  8, -5] , [ 1, -9]] ]

	 var scale = 1;
	 if(r <= 2){
	 	scale = size / 40;
	 }
	 else if (r <= 5){
	 	scale = size / 20;
	 }
	 else{
	 	scale = size / 10;
	 }
	 return [shapes[r],scale];
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
	this.asteroids = [new Asteroid(new Vector2d(1280/2, 720/2),2,40)];
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

