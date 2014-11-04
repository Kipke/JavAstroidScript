var keysHeld = {};

document.addEventListener('keydown', function(e){
	keysHeld[e.keyCode] = true;
});
document.addEventListener('keyup', function(e){
	keysHeld[e.keyCode] = false;
});

function processInput(world) {
	var p = world.player;
	if (keysHeld[37]) {
		// move left
		p.angle -= p.rotateRate;
	}
	if (keysHeld[39]) {
		// move right
		p.angle += p.rotateRate;
	}
	if (keysHeld[38]) {
		// change movement vector				
		p.mov.move(p.accelerate,(Math.PI *2) - p.angle);		
		// limit the size of the movement vector
		if(p.mov.length > p.maxSpeed){
		 	p.mov.scale(p.maxSpeed / p.mov.length);
		}
	}
	if(!keysHeld[38]){
		// if there is no thrust, apply drag
		if(p.mov.length > p.minSpeed){			
			var vInv = p.mov.copy().scale(-1).normalize().scale(p.dragRate);			
			p.mov.translate(vInv);
		}
		else{
			p.mov = new Vector2d(0,0);
		}
	}
	if (keysHeld[32]) {
		// shoot
		if(p.charge >= p.fireRate){
			world.lasers.push(new Laser(p.pos.copy(),p.mov.copy(),p.angle));
			p.charge = 0;
		}		
	}
}

function processPhysics(world) {
	var p = world.player;
	// move forward
	wrapAround(world,p.pos.translate(p.mov));
	// update the player charge
	if(p.charge < p.fireRate){
		p.charge++;
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

function applyDrag(vector){
	var vInv = vector.copy().scale(-1).normalize().scale(0.25);
	vector.translate(vInv);
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
