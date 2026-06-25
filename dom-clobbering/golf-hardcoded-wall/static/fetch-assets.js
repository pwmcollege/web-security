const holeSvg = new Image();
holeSvg.src = "/static/hole.svg";
const ballSvg = new Image();
ballSvg.src = "/static/golf-ball.svg";

await holeSvg.decode();
await ballSvg.decode();

export { holeSvg, ballSvg };