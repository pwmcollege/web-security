import {moveBall, startGame} from "./game.js";
let clicked = false;
let moving = false;
let lastX = null;
let lastY = null;
document.body.addEventListener("mousedown", (e) => {
    clicked = true;
    lastX = e.clientX;
    lastY = e.clientY;
})

document.body.addEventListener("mousemove", (e) => {
    // idk
})

document.body.addEventListener("mouseup", async (e) => {
    clicked = false;
    if (moving) {
        return; // Don't allow multiple hits of the ball at once
    }
    moving = true;
    const newX = e.clientX;
    const newY = e.clientY;
    const xDiff = newX - lastX;
    const yDiff = newY - lastY;
    await moveBall(xDiff,yDiff)
    moving = false;
})

startGame();