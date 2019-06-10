let y_vals = [];
let x_vals = [];
var startX = -1;
var startY = 0;

var frequency = 1 ;//higher frequency = slower
var xIncrement = 0.01;
var yIncrement = 0.05;

var xCameraFocus = 0.75;
var yCameraFocus = 0.75;

var n = 2;
var p = 1/n; //probability to rise

var looper = 0;

function setup() {
  createCanvas(window.innerHeight, window.innerHeight - 100);
  background(0);
  x_vals.push(startX - 0.01);
  y_vals.push(startY - 0.01);
  x_vals.push(startX);
  y_vals.push(startY);
}

function mapX(x) {
  return map(x, -1, 1, 0, width);
}

function mapY(y) {
  return map(y, -1, 1, height, 0);
}

// function mousePressed() {
//   x_vals.push(map(mouseX, 0, width, -1, 1));
//   y_vals.push(map(mouseY, 0, height, 1, -1));
// }

function drawPoints() {
  background(0);
  stroke(255);
  strokeWeight(1);
  for (let i = 1; i < x_vals.length; i++) {
    let x1 = mapX(x_vals[i]);
    let y1 = mapY(y_vals[i]);
    let x2 = mapX(x_vals[i - 1]);
    let y2 = mapY(y_vals[i - 1]);
    line(x1, y1, x2, y2);
  }
}

function uniformRandomVar() {
  return Math.floor(random(n));
}

function shiftXCamera() {
  for (let i = 0; i < x_vals.length; i++) {
    x_vals[i] -= xIncrement;
  }
}

function shiftYCameraUp() {
  for (let i = 0; i < y_vals.length; i++) {
    y_vals[i] -= yIncrement;
  }
}

function shiftYCameraDown() {
  for (let i = 0; i < y_vals.length; i++) {
    y_vals[i] += yIncrement;
  }
}



function draw() {
  looper++;
  if (x_vals[x_vals["length"] - 1] > xCameraFocus) {
    shiftXCamera();
  }
  if (y_vals[y_vals["length"] - 1] > yCameraFocus) {
    shiftYCameraUp();
  }
  if (y_vals[y_vals["length"] - 1] < -yCameraFocus) {
    shiftYCameraDown();
  }


  if (looper == frequency) {
    var randVar = uniformRandomVar();
    if (randVar >= n*p) {
      x_vals.push(x_vals[x_vals["length"] - 1] + xIncrement);
      y_vals.push(y_vals[y_vals["length"] - 1] - yIncrement);
    } else {
      x_vals.push(x_vals[x_vals["length"] - 1] + xIncrement);
      y_vals.push(y_vals[y_vals["length"] - 1] + yIncrement);
    }
    looper = 0;
  }
  drawPoints();
}
