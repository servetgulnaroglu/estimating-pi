let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let dotCountEl = document.getElementById("dotCount");
let piEl = document.getElementById("pi");
let differenceEl = document.getElementById("difference");

let drawRect = (x, y, width, height, color) => {
  ctx.strokeStyle = color;
  ctx.rect(x, y, width, height);
  ctx.stroke();
};

let fillRect = (x, y, width, height, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

let drawCircle = (x, y, radius, color) => {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 10;
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.stroke();
};

let fillCircle = (x, y, radius, color) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fill();
};

let speed = 10000;

let gameLoop = () => {
  setInterval(drawAndUpdate, 1000 / speed);
};

let dotColor = "white";
let shapeColor = "red";
let backgroundColor = "black";

let allDots = [];
let dotRadius = 2;
let circleRadius = canvas.width / 2;

let dotCountInCircle = 0;

let createNewDot = () => {
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height;
  allDots.push({ x: x, y: y });
  let xDistanceToCenter = Math.abs(canvas.width / 2 - x);
  let yDistanceToCenter = Math.abs(canvas.height / 2 - y);
  let distance = Math.sqrt(
    xDistanceToCenter * xDistanceToCenter +
      yDistanceToCenter * yDistanceToCenter
  );
  if (distance < canvas.width / 2) {
    dotCountInCircle++;
  }
  fillCircle(x, y, dotRadius, dotColor);
};

let makeEstimationToPI = () => {
  let pi = (dotCountInCircle * 4) / allDots.length;
  dotCountEl.innerText = "Dot count: " + allDots.length;
  piEl.innerText = "Estimated PI: " + pi;
  differenceEl.innerText =
    "Difference between real PI: " + Math.abs(Math.PI - pi);
};

let drawAndUpdate = () => {
  createNewDot();
  makeEstimationToPI();
  drawCircle(canvas.width / 2, canvas.height / 2, circleRadius, shapeColor);
  drawRect(0, 0, canvas.width, canvas.height, shapeColor);
};

gameLoop();
