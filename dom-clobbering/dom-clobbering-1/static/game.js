// "real size" (display size) of canvas, different from the size used by graphics
const CANVAS_HEIGHT = 400;
const CANVAS_WIDTH = 400;
const BALL_RADIUS = 14/2;
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d")
const ball = document.getElementById("ball")
const hole = document.getElementById("hole")
let strokes = 0;
let won = false;

// Data format for walls: [x,[yMin,yMax]] for vertical, [y, [xMin,xMax]] for horizontal
const vertWalls = [[0,[0,CANVAS_HEIGHT]],[CANVAS_WIDTH,[0,CANVAS_HEIGHT]]];
const horizWalls = [[0,[0,CANVAS_WIDTH]],[CANVAS_HEIGHT,[0,CANVAS_WIDTH]]];

function win() {
    won = true;
    alert(`YOU WIN!!!\n${strokes} strokes`)
}

function ballInHole() {
    const ballRect = ball.getBoundingClientRect();
    const holeRect = hole.getBoundingClientRect();
    return ballRect.left >= holeRect.left && ballRect.right <= holeRect.right && ballRect.top >= holeRect.top && ballRect.bottom <= holeRect.bottom;
}

/* A helper function to enable sleep-like behavior based on promises */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* Moves ball, taking into account the wall. Returns updated xNorm and yNorm in case a bounce occurred. */
function moveWithBounce(xNorm, yNorm, dist) {
    if (dist < 0.001) {
        return [xNorm,yNorm]
    }
    const ballY = parseInt(window.getComputedStyle(ball).top);
    const ballX = parseInt(window.getComputedStyle(ball).left);
    let minDistX = Number.MAX_VALUE;
    for (const wall of vertWalls) {
        if (xNorm > 0 && wall[0] < ballX) continue; // No way to hit this wall
        if (xNorm < 0 && wall[0] > ballX) continue; // No way to hit this wall
        const currDist = Math.abs(wall[0]-ballX)-BALL_RADIUS;
        minDistX = Math.min(minDistX,currDist);
    }
    let minDistY = Number.MAX_VALUE;
    for (const wall of horizWalls) {
        if (yNorm > 0 && wall[0] < ballY) continue; // No way to hit this wall
        if (yNorm < 0 && wall[0] > ballY) continue; // No way to hit this wall
        const currDist = Math.abs(wall[0]-ballY)-BALL_RADIUS;
        minDistY = Math.min(minDistY,currDist);
    }
    const realDistY = Math.abs(yNorm * dist);
    const realDistX = Math.abs(xNorm * dist);

    let newDist = dist;
    let newXNorm = xNorm;
    let newYNorm = yNorm;
    
    if (minDistY < realDistY && minDistX < realDistX) {
        // Check whether we hit a vertical or horizontal wall first
        if (minDistY/realDistY < minDistX/realDistX) {
            console.log("bounce off horizontal")
            newDist = minDistY/yNorm;
            newYNorm *= -1;
        } else {
            console.log("bounce off vertical")
            newDist = minDistX/xNorm;
            newXNorm *= -1;
        }
    } else if (minDistY < realDistY) {
        console.log("bounce off horizontal")
        newDist = minDistY/yNorm;
        newYNorm *= -1;
    } else if (minDistX < realDistX) {
        console.log("bounce off vertical")
        newDist = minDistX/xNorm;
        newXNorm *= -1;
    }
    ball.style.top = (ballY + yNorm * newDist) + "px";
    ball.style.left = (ballX + xNorm * newDist) + "px";
    return moveWithBounce(newXNorm,newYNorm,dist-newDist);
}

async function moveBall(xDiff, yDiff) {
    strokes++;
    let magnitude = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    let xNorm = xDiff / magnitude;
    let yNorm = yDiff / magnitude;
    magnitude = Math.min(magnitude, 100); // Cap out magnitude
    let stepDist = magnitude / 5;
    while (stepDist > 0) {
        [xNorm, yNorm] = moveWithBounce(xNorm,yNorm,stepDist);
        await sleep(50);
        stepDist -= 1;
    }
    if (ballInHole() && !won) {
        win();
    }
}

function initCanvas() {
    // Decorate the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

async function startGame() {
    // Reset the position of the ball
    ball.style.removeProperty("top")
    ball.style.removeProperty("left")
    strokes = 0
    won = false;
    if (ballInHole()) { // Lucky user gets a cosmic bit flip??
        win()
    }
}


export { moveBall, startGame, initCanvas }