
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
