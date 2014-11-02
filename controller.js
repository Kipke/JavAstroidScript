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
		world.player.angle -= 0.01;
	}
	if (keysHeld[39]) {
		// move right
		world.player.angle += 0.01;
	}
	if (keysHeld[38]) {
		// move forward
		world.player.pos.move(1,(Math.PI *2) - world.player.angle);
	}
	if (keysHeld[32]) {
		// shoot
	}
}

function processPhysics() {
}
