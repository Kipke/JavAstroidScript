var world = new World();

function gameLoop() {
    processInput(world);
    processPhysics(world);
    draw(world);
}

setInterval(gameLoop, 1000/60);
