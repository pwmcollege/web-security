import { moveBall, startGame, updateCanvas } from "./game.js";
import { purify } from "./purify.js";
startGame();

let clicked = false;
let moving = false;
let lastX = null;
let lastY = null;
let recording = false;
let strokes = [];
let walls = null;
const pageUsername = document.getElementById("page-username");
const startRecord = document.getElementById("start-record");
const stopRecord = document.getElementById("stop-record");
const submitRecord = document.getElementById("submit-record");
const canvas = document.getElementById("user-canvas");
const ctx = canvas.getContext("2d");
const mapSelect = document.getElementById("map-select");
const mapAdd = document.getElementById("map-add");

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
    strokes = [];
    walls = structuredClone(window.walls);
    recording = true;
    startRecord.disabled = true;
    stopRecord.disabled = false;
    submitRecord.disabled = true;
    startGame();
});

stopRecord?.addEventListener("click", () => {
    if (!recording) {
        console.error("Already stopped recording");
    }
    recording = false;
    stopRecord.disabled = true;
    startRecord.disabled = false;
    submitRecord.disabled = false;
    console.log(strokes);
});

submitRecord?.addEventListener("click", () => {
    fetch("http://challenge.internal:80/record", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
            strokes: strokes,
            walls: walls,
        }),
    });
    submitRecord.disabled = true; // Let the user know that the recording was submitted
    console.log("Submitted recording!");
});

mapSelect?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (moving) {
        console.error("Ball is moving; Can't switch map");
        return;
    }
    if (recording) {
        console.error("Currently recording");
        return;
    }
    const layoutName = mapSelect.elements["map-name"].value;
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
        if (cookie.trim().startsWith(layoutName + "=")) {
            window.walls = JSON.parse(cookie.split("=")[1]);
            document.cookie = "active=" + layoutName;
            updateCanvas();
            mapSelect.reset();
            return;
        }
    }
    console.error(`New wall layout ${layoutName} does not exist`);
})

mapAdd?.addEventListener("submit", (e) => {
    e.preventDefault();
    const layoutName = mapAdd.elements["map-name"].value;
    const layoutWalls = mapAdd.elements["map-walls"].value;
    document.cookie = layoutName + "=" + layoutWalls;
    mapAdd.reset();
})

document.body.addEventListener("mousedown", (e) => {
    if (canvas.contains(e.target)) {
        clicked = true;
        lastX = e.clientX;
        lastY = e.clientY;
    }
});

document.addEventListener("mousemove", (e) => {
    if (clicked) {
        function getCanvasXY(x, y) {
            const rect = canvas.getBoundingClientRect();
            const xDiff = x - rect.left;
            const yDiff = y - rect.top;
            const canvasStyles = window.getComputedStyle(canvas);
            return [
                (xDiff * canvas.width) / parseInt(canvasStyles.width),
                (yDiff * canvas.height) / parseInt(canvasStyles.height),
            ];
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "rgb(255,0,0)";
        ctx.beginPath();
        ctx.moveTo(...getCanvasXY(lastX, lastY));
        ctx.lineTo(...getCanvasXY(e.clientX, e.clientY));
        ctx.stroke();
    }
});

document.addEventListener("mouseup", async (e) => {
    if (!clicked) {
        return; // We did not start off by clicking within the canvas
    }
    clicked = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (moving) {
        return; // Don't allow multiple hits of the ball at once
    }
    moving = true;
    const newX = e.clientX;
    const newY = e.clientY;
    const xDiff = lastX - newX;
    const yDiff = lastY - newY;
    if (recording) {
        strokes.push([xDiff, yDiff]);
    }
    await moveBall(xDiff, yDiff);
    moving = false;
});

if (pageUsername !== null) {
    // Magic to get username
    fetch("/self").then((resp)=>{
        return resp.text()
    }).then((text)=>{
        pageUsername.appendChild(purify(text));
    })
}