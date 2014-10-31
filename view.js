var draw = (function(context){

	function drawPlayer(player){
		context.fillStyle = 'white';
		context.fillRect(player.pos.x, player.pos.y, 10, 10);

	}

	return function (world){
		context.clearRect(0,0,world.width, world.height)
		
		drawPlayer(world.player);
	};

})(document.getElementById('canvas').getContext('2d'));

