var draw = (function(context){

	function drawPlayer(player){
		context.fillStyle = 'white';
		//context.strokeStyle = 'white';
		
		var playerModel = new VectorList([[0,0],[1,-1],[0,2],[-1,-1]]);
		playerModel.apply("scale",15);
		playerModel.apply("rotate",player.angle,new Vector2d(0,0))
		playerModel.apply("translate",player.pos);		
		drawPath('white',playerModel.vectors);		

	}

	return function (world){
		var t = Vector2d(10,10);
		context.clearRect(0,0,world.width, world.height)
		
		drawPlayer(world.player);
	};

	function drawPath(color,path){
	context.strokeStyle = color;
	context.beginPath();
        context.moveTo(path[0].x, path[0].y);
        for(var i = 1; i < path.length; i++){
        	context.lineTo(path[i].x, path[i].y);
        }
        context.lineTo(path[0].x, path[0].y);
        context.stroke();
}

})(document.getElementById('canvas').getContext('2d'));





