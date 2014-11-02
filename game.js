var world = new World();

function gameLoop() {
    processInput(world);
    processPhysics();
    draw(world);
}

setInterval(gameLoop, 60/1000);
