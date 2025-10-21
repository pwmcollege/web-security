import { moveBall, startGame, initGame } from "./game.js";
initGame();

let clicked = false;
let moving = false;
let lastX = null;
let lastY = null;
let recording = false;
let strokes = []
const startRecord = document.getElementById("start-record")
const stopRecord = document.getElementById("stop-record")
const submitRecord = document.getElementById("submit-record")

startRecord?.addEventListener("click", async () => {
    if (moving) {
        console.error("Ball is moving; Can't start recording");
        return;
    }
    if (recording) {
        console.error("Already recording");
        return;
    }
    // Reset the game state
    strokes = []
    recording = true;
    startRecord.disabled = true;
    stopRecord.disabled = false;
    submitRecord.disabled = true;
    startGame();
})

stopRecord?.addEventListener("click", () => {
    if (!recording) {
        console.error("Already stopped recording");
    }
    recording = false;
    stopRecord.disabled = true;
    startRecord.disabled = false;
    submitRecord.disabled = false;
    console.log(strokes)
})

submitRecord?.addEventListener("click", () => {
    fetch("http://challenge.localhost:80/record", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(strokes)
    });
    submitRecord.disabled = true; // Let the user know that the recording was submitted
    console.log("Submitted recording!");
})

document.body.addEventListener("mousedown", (e) => {
    if (document.getElementById("game-canvas").contains(e.target)) {
        clicked = true;
        lastX = e.clientX;
        lastY = e.clientY;
    }
})

document.body.addEventListener("mousemove", (e) => {
    // idk
})

document.body.addEventListener("mouseup", async (e) => {
    if (!clicked) {
        return; // We did not start off by clicking within the canvas
    }
    clicked = false;
    if (moving) {
        return; // Don't allow multiple hits of the ball at once
    }
    moving = true;
    const newX = e.clientX;
    const newY = e.clientY;
    const xDiff = newX - lastX;
    const yDiff = newY - lastY;
    if (recording) {
        strokes.push([xDiff, yDiff]);
    }
    await moveBall(xDiff, yDiff)
    moving = false;
})