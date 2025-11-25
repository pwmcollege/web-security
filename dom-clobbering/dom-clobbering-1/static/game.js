// "real size" (display size) of canvas, different from the size used by graphics
const CANVAS_HEIGHT = 400;
const CANVAS_WIDTH = 400;
const BALL_RADIUS = 14/2;
const DELTA = 1e-6; // Delta value to reduce chance of ball clipping
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d")
const ball = document.getElementById("ball")
const hole = document.getElementById("hole")
let strokes = 0;
let won = false;
let ballX;
let ballY;

// Data format for walls: [x,[yMin,yMax]] for vertical, [y, [xMin,xMax]] for horizontal
const vertWalls = [[0,[0,CANVAS_HEIGHT]],[100,[0,300]],[200,[0,300]],[300,[100,200]],[CANVAS_WIDTH,[0,CANVAS_HEIGHT]]];
const horizWalls = [[0,[0,CANVAS_WIDTH]],[100,[300,400]],[200,[300,400]],[300,[100,200]],[CANVAS_HEIGHT,[0,CANVAS_WIDTH]]];

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

function distanceToWall(ballMajor, ballMinor, normMajor, normMinor, wall) {
    if (normMajor > 0 && wall[0] < ballMajor) return null; // No way to hit this wall
    if (normMajor < 0 && wall[0] > ballMajor) return null; // No way to hit this wall
    const majorDist = Math.abs(wall[0]-ballMajor)-BALL_RADIUS;
    const dist = Math.abs(majorDist/normMajor);
    // Check for an actual collision with the wall
    const minorLoc = ballMinor + dist*normMinor;
    if (wall[1][0]-BALL_RADIUS-DELTA < minorLoc && wall[1][1]+BALL_RADIUS+DELTA > minorLoc) {
        return dist;
    } else {
        return null;
    }
}

/* Moves ball, taking into account the wall. Returns updated xNorm and yNorm in case a bounce occurred. */
function moveWithBounce(xNorm, yNorm, dist) {
    if (dist < 0.001) {
        return [xNorm,yNorm]
    }
    
    let minDistVertWall = Number.MAX_VALUE;
    for (const wall of vertWalls) {
        const currDist = distanceToWall(ballX, ballY, xNorm, yNorm, wall);
        if (currDist != null) {
            minDistVertWall = Math.min(minDistVertWall,currDist);
        }
    }
    let minDistHorizWall = Number.MAX_VALUE;
    for (const wall of horizWalls) {
        const currDist = distanceToWall(ballY, ballX, yNorm, xNorm, wall);
        if (currDist != null) {
            minDistHorizWall = Math.min(minDistHorizWall,currDist);
        }
    }
    let newDist = dist;
    let newXNorm = xNorm;
    let newYNorm = yNorm;
    
    if (minDistVertWall < dist || minDistHorizWall < dist) {
        // There is some bouncing
        if (minDistVertWall < minDistHorizWall) {
            // Vertical wall closer
            console.log("bounce off vertical")
            newDist = minDistVertWall;
            newXNorm *= -1;
        } else {
            console.log("bounce off horizontal")
            newDist = minDistHorizWall;
            newYNorm *= -1;
        }
    }
    ballY = ballY + yNorm * newDist;
    ballX = ballX + xNorm * newDist;
    ball.style.top = ballY + "px";
    ball.style.left = ballX + "px";
    return moveWithBounce(newXNorm,newYNorm,dist-newDist);
}

async function moveBall(xDiff, yDiff) {
    strokes++;
    let magnitude = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    let xNorm = xDiff / magnitude;
    let yNorm = yDiff / magnitude;
    magnitude = Math.min(magnitude, 100); // Cap out magnitude
    let stepDist = magnitude / 3;
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
    const scaleX = canvas.width/CANVAS_WIDTH;
    const scaleY = canvas.height/CANVAS_HEIGHT;
    // Decorate the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw in the walls
    ctx.strokeStyle = "blue";
    for (const wall of vertWalls) {
        ctx.beginPath();
        ctx.moveTo(wall[0]*scaleX,wall[1][0]*scaleY);
        ctx.lineTo(wall[0]*scaleX,wall[1][1]*scaleY);
        ctx.stroke();
    }
    for (const wall of horizWalls) {
        ctx.beginPath();
        ctx.moveTo(wall[1][0]*scaleX,wall[0]*scaleY);
        ctx.lineTo(wall[1][1]*scaleX,wall[0]*scaleY);
        ctx.stroke();
    }
}

async function startGame() {
    // Reset the position of the ball
    ball.style.removeProperty("top")
    ball.style.removeProperty("left")
    ballY = parseInt(window.getComputedStyle(ball).top);
    ballX = parseInt(window.getComputedStyle(ball).left);
    strokes = 0
    won = false;
    if (ballInHole()) { // Lucky user gets a cosmic bit flip??
        win()
    }
}


export { moveBall, startGame, initCanvas }