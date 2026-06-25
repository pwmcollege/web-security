import { holeSvg, ballSvg } from "./fetch-assets.js";
// "real size" (display size) of canvas, different from the size used by graphics
const DELTA = 1e-6; // Delta value to reduce chance of ball clipping
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d")
const ball = {
    x: 10,
    y: 300,
    RADIUS: 14 / 2,
    get WIDTH() {
        return this.RADIUS * 2
    },
    get HEIGHT() {
        return this.RADIUS * 2
    },
};

const hole = {
    x: 300,
    y: 20,
    RADIUS: 25 / 2,
    get WIDTH() {
        return this.RADIUS * 2
    },
    get HEIGHT() {
        return this.RADIUS * 2
    },
};
let strokes = 0;
let won = false;

function win() {
    won = true;
    alert(`YOU WIN!!!\n${strokes} strokes`)
}

function ballInHole() {
    return (ball.x - ball.WIDTH / 2 > hole.x - hole.WIDTH / 2 &&
        ball.x + ball.WIDTH / 2 < hole.x + hole.WIDTH / 2 &&
        ball.y - ball.HEIGHT / 2 > hole.y - hole.HEIGHT / 2 &&
        ball.y + ball.HEIGHT / 2 < hole.y + hole.HEIGHT / 2
    );
}

/* A helper function to enable sleep-like behavior based on promises */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function distanceToWall(ballMajor, ballMinor, normMajor, normMinor, wall) {
    if (normMajor > 0 && wall[0] < ballMajor) return null; // No way to hit this wall
    if (normMajor < 0 && wall[0] > ballMajor) return null; // No way to hit this wall
    const majorDist = Math.abs(wall[0] - ballMajor) - ball.RADIUS;
    const dist = Math.abs(majorDist / normMajor);
    // Check for an actual collision with the wall
    const minorLoc = ballMinor + dist * normMinor;
    if (wall[1][0] - ball.RADIUS - DELTA < minorLoc && wall[1][1] + ball.RADIUS + DELTA > minorLoc) {
        return dist;
    } else {
        return null;
    }
}

/* Moves ball, taking into account the wall. Returns updated xNorm and yNorm in case a bounce occurred. */
function moveWithBounce(xNorm, yNorm, dist) {
    if (dist < 0.001) {
        return [xNorm, yNorm]
    }

    let minDistVertWall = Number.MAX_VALUE;
    for (const wall of document.vertWalls) {
        const currDist = distanceToWall(ball.x, ball.y, xNorm, yNorm, wall);
        if (currDist != null) {
            minDistVertWall = Math.min(minDistVertWall, currDist);
        }
    }
    let minDistHorizWall = Number.MAX_VALUE;
    for (const wall of document.horizWalls) {
        const currDist = distanceToWall(ball.y, ball.x, yNorm, xNorm, wall);
        if (currDist != null) {
            minDistHorizWall = Math.min(minDistHorizWall, currDist);
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
    ball.y = ball.y + yNorm * newDist;
    ball.x = ball.x + xNorm * newDist;
    return moveWithBounce(newXNorm, newYNorm, dist - newDist);
}

async function moveBall(xDiff, yDiff) {
    strokes++;
    let magnitude = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    let xNorm = xDiff / magnitude;
    let yNorm = yDiff / magnitude;
    magnitude = Math.min(magnitude, 100); // Cap out magnitude
    let stepDist = magnitude / 3;
    while (stepDist > 0) {
        [xNorm, yNorm] = moveWithBounce(xNorm, yNorm, stepDist);
        updateCanvas();
        await sleep(50);
        stepDist -= 1;
    }
    if (ballInHole() && !won) {
        win();
    }
}

function updateCanvas() {
    const scaleX = canvas.width / 400;
    const scaleY = canvas.height / 400;
    // Decorate the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "green";
    if (Object.hasOwn(window.theme, "green")) { // The golf green not the color green
        const greenTheme = window.theme["green"];
        if (Object.hasOwn(greenTheme, "color")) {
            ctx.fillStyle = greenTheme["color"];
        }
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw in the ball and hole
    ctx.drawImage(holeSvg, (hole.x - hole.WIDTH / 2) * scaleX, (hole.y - hole.HEIGHT / 2) * scaleY, hole.WIDTH * scaleX, hole.HEIGHT * scaleY);
    ctx.drawImage(ballSvg, (ball.x - ball.WIDTH / 2) * scaleX, (ball.y - ball.HEIGHT / 2) * scaleY, ball.WIDTH * scaleX, ball.HEIGHT * scaleY);

    // Draw in the walls
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 1;
    if (Object.hasOwn(window.theme, "wall")) {
        const wallTheme = window.theme["wall"];
        if (Object.hasOwn(wallTheme, "color")) {
            ctx.strokeStyle = wallTheme["color"];
        }
        if (Object.hasOwn(wallTheme, "width")) {
            ctx.lineWidth = wallTheme["width"];
        }
    }
    for (const wall of document.vertWalls) {
        ctx.beginPath();
        ctx.moveTo(wall[0] * scaleX, wall[1][0] * scaleY);
        ctx.lineTo(wall[0] * scaleX, wall[1][1] * scaleY);
        ctx.stroke();
    }
    for (const wall of document.horizWalls) {
        ctx.beginPath();
        ctx.moveTo(wall[1][0] * scaleX, wall[0] * scaleY);
        ctx.lineTo(wall[1][1] * scaleX, wall[0] * scaleY);
        ctx.stroke();
    }
}

async function startGame() {
    // Reset the position of the ball
    ball.x = 10;
    ball.y = 300;
    hole.x = 300;
    hole.y = 20;
    strokes = 0
    won = false;

    updateCanvas();

    if (ballInHole()) { // Lucky user gets a cosmic bit flip??
        win();
    }
}


export { moveBall, startGame, updateCanvas }