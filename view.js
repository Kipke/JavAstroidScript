var draw = (function(context){

	function drawPlayer(player){
		context.fillStyle = 'white';
		context.strokeStyle = 'white';
		
		var playerModel = new VectorList([[-1,-1],[0,1],[1,-1],[-1,-1]]);
		playerModel.apply("scale",25);
		playerModel.apply("rotate",player.angle,new Vector2d(0,0))
		playerModel.apply("translate",player.pos);		

		context.beginPath();
        context.moveTo(playerModel.vectors[0].x, playerModel.vectors[0].y);
        for(var i = 1; i < playerModel.vectors.length; i++){
        	context.lineTo(playerModel.vectors[i].x, playerModel.vectors[i].y);
        }
        context.stroke();

	}

	return function (world){
		var t = Vector2d(10,10);
		context.clearRect(0,0,world.width, world.height)
		
		drawPlayer(world.player);
	};

})(document.getElementById('canvas').getContext('2d'));



