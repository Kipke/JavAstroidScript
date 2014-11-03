var draw = (function(context){

	function drawModel(modelStr,obj){
		var model;
		var color;
		var scale;
		switch(modelStr){
			case 'player':  model = new VectorList([[0,0],[1,-1],[0,2],[-1,-1]]);
							color = 'white';
							scale = 15;
							break;
			case 'laser': 	model = new VectorList([[0,0],[1,-1],[0,2],[-1,-1]]);
							color = 'green';
							scale = 5;
							break;
			default: 		return;
		}

		model.apply("scale",scale);
		model.apply("rotate",obj.angle,new Vector2d(0,0))
		model.apply("translate",obj.pos);		
		drawPath(color,model.vectors);
	}	

	return function (world){
		var t = Vector2d(10,10);
		context.clearRect(0,0,world.width, world.height)
		world.lasers.map(function(x){ drawModel('laser',x);});
		//drawPlayer(world.player);
		drawModel('player',world.player);
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





