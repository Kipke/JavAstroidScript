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
		world.player.angle -= world.player.rotateRate;
	}
	if (keysHeld[39]) {
		// move right
		world.player.angle += world.player.rotateRate;
	}
	if (keysHeld[38]) {
		// change movement vector				
		world.player.mov.move(world.player.accelerate,(Math.PI *2) - world.player.angle);		
		// limit the size of the movement vector
		if(world.player.mov.length > world.player.maxSpeed){
		 	world.player.mov.scale(world.player.maxSpeed / world.player.mov.length);
		}
	}
	if (keysHeld[32]) {
		// shoot
		if(world.player.charge >= world.player.fireRate){
			world.lasers.push(new Laser(world.player.pos.copy(),world.player.mov.copy(),world.player.angle));
			world.player.charge = 0;
		}		
	}
}

function processPhysics(world) {
	// move forward
	wrapAround(world,world.player.pos.translate(world.player.mov));
	// apply the drag
	if(world.player.mov.length > 0){
		//world.player.mov.move(-0.05,(Math.PI *2) - world.player.angle);
		world.player.mov.scale(0.99);
	}
	// update the player charge
	if(world.player.charge < world.player.fireRate){
		world.player.charge++;
	}
	// update the lasers
	world.lasers.map(function(x){
		wrapAround(world,x.pos.translate(x.mov));
		x.charge--;
	});
	world.lasers = world.lasers.filter(function(x){
		return x.charge > 0;
	});
}

function wrapAround(world,vector){
	if(vector.x < 0){
		vector.x += world.width;		
	}
	if(vector.x > world.width){
		vector.x -= world.width;
	}
	if(vector.y < 0){
		vector.y += world.height;		
	}
	if(vector.y > world.height){
		vector.y -= world.height;
	}
	return vector;
}
