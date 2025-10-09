const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d")
const ball = document.getElementById("ball")
const hole = document.getElementById("hole")
let strokes = 0;
function ballInHole() {
    const ballRect = ball.getBoundingClientRect();
    const holeRect = hole.getBoundingClientRect();
    return ballRect.left >= holeRect.left && ballRect.right <= holeRect.right && ballRect.top >= holeRect.top && ballRect.bottom <= holeRect.bottom;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function moveBall(xDiff,yDiff) {
    strokes++;
    let magnitude = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    const xNorm = xDiff/magnitude;
    const yNorm = yDiff/magnitude;
    magnitude = Math.min(magnitude, 200); // Cap out magnitude
    let velocity = magnitude /5;
    while (velocity > 0) {
        ball.style.top = (parseInt(window.getComputedStyle(ball).top)-yNorm*velocity)+"px";
        ball.style.left = (parseInt(window.getComputedStyle(ball).left)-xNorm*velocity)+"px";
        await sleep(50);
        velocity -= 1;
    }
}

async function startGame() {
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    while (true) {
        if (ballInHole()) {
            alert(`YOU WIN!!! - ${strokes} strokes`);
            break;
        }
        await sleep(500);
    }
}


export {moveBall,startGame}