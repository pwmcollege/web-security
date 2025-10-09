const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d")
const ball = document.getElementById("ball")
const hole = document.getElementById("hole")

function ballRectInHole() {
    const ballRect = ball.getBoundingClientRect();
    const holeRect = hole.getBoundingClientRect();
    return ballRect.left >= holeRect.left && ballRect.right <= holeRect.right && ballRect.top >= holeRect.top && ballRect.bottom <= holeRect.bottom;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

ctx.fillStyle = "green";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let clicked = false;
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
    const newX = e.clientX;
    const newY = e.clientY;
    const xDiff = newX - lastX;
    const yDiff = newY - lastY;
    let magnitude = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    const xNorm = xDiff/magnitude;
    const yNorm = yDiff/magnitude;
    magnitude = Math.max(magnitude, 100); // Cap out magnitude
    let velocity = magnitude /20;
    while (velocity > 0) {
        ball.style.top = (parseInt(window.getComputedStyle(ball).top)-yNorm*velocity)+"px";
        ball.style.left = (parseInt(window.getComputedStyle(ball).left)-xNorm*velocity)+"px";
        await sleep(50);
        velocity -= 1;
    }
})

while (true) {
    if (ballRectInHole()) {
        alert("YOU WIN!!!");
        break;
    }
    await sleep(500);
}