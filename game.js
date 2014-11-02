var world = new World();

function gameLoop() {
    processInput(world);
    processPhysics(world);
    draw(world);
}

setInterval(gameLoop, 60/1000);
