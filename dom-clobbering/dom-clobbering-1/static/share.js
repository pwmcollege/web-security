import { moveBall, startGame } from "./game.js";
// Load game record from the server
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');

const strokes = await (await fetch("/record?"+new URLSearchParams({
    username:username
}))).json();

startGame();
for (const stroke of strokes) {
    const strokeX = stroke[0];
    const strokeY = stroke[1];
    console.log(strokeX+" "+strokeY);
    await moveBall(strokeX,strokeY);
}