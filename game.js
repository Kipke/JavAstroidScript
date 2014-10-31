var world = new World();

function gameLoop() {
    processInput();
    processPhysics();
    draw(world);
}

setInterval(gameLoop, 60/1000);
