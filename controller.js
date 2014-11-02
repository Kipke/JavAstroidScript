var keysHeld = {};

document.addEventListener('keydown', function(e){
	keysHeld[e.keyCode] = true;
});
document.addEventListener('keyup', function(e){
	keysHeld[e.keyCode] = false;
});

function processInput(world) {
	if (keysHeld[37]) {
		// move left
		world.player.angle -= 0.02;
	}
	if (keysHeld[39]) {
		// move right
		world.player.angle += 0.02;
	}
	if (keysHeld[38]) {
		// change movement vector		
		world.player.mov.move(0.05,(Math.PI *2) - world.player.angle);		
		var t = 1.4 / world.player.mov.length;		
		world.player.mov.scale(t);		
		//world.player.mov.normalize();

	}
	if (keysHeld[32]) {
		// shoot
	}
}

function processPhysics(world) {
	// move forward
	world.player.pos.translate(world.player.mov);
	var p = world.player.pos;	
}
