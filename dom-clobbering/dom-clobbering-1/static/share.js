import { moveBall, startGame, initCanvas } from "./game.js";
initCanvas();
// Load game record from the server
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');

const strokes = await (await fetch("/record?" + new URLSearchParams({
    username: username
}))).json();

let replaying = false
const replayButton = document.getElementById("start-replay")
replayButton.addEventListener("click", async () => {
    if (replaying) {
        return; // Replay already in progress
    }
    replaying = true
    startGame();
    replayButton.disabled = true;
    for (const stroke of strokes) {
        const strokeX = stroke[0];
        const strokeY = stroke[1];
        console.log(strokeX + " " + strokeY);
        await moveBall(strokeX, strokeY);
    }
    replayButton.disabled = false;
    replaying = false;
})

