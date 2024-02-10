let rects = [];
const borderSize = 10;
const cellSize = 200;
const numRectangles = 5;
const maxAttempts = 200;
let backgroundColor; 
function setup() {
  createCanvas(640, 800);
  noLoop();
  backgroundColor = color(random(256), random(256), random(256), (256));
  background(backgroundColor);
  generateRandomRectangles(numRectangles);
}
function draw() {
  drawBorder();
}
function generateRandomRectangles(numRectangles) {
  for (let r = 0; r < numRectangles; r++) {
    let newRect;
    let attempts = 0;
    do {
      newRect = createRandomRect();
      attempts++;
    } while (Overlap(newRect, rects) && attempts < maxAttempts);
    if (attempts < maxAttempts) {
      rects.push(newRect);
      drawRectangle(newRect);
    }
  }
}
function createRandomRect() {
  return {
    x: round(random(borderSize, width - borderSize) / cellSize) * cellSize,
    y: round(random(borderSize, height - borderSize) / cellSize) * cellSize,
    w: round(random(1, (width - borderSize) / cellSize - 1)) * cellSize,
    h: round(random(1, (height - borderSize) / cellSize - 1)) * cellSize,
    col: color(random(256), random(256), random(256), random(100, 200)),
  };
}
function Overlap(newRect, existingRects) {
  for (let existingRect of existingRects) {
    if (
      newRect.x < existingRect.x + existingRect.w &&
      newRect.x + newRect.w > existingRect.x &&
      newRect.y < existingRect.y + existingRect.h &&
      newRect.y + newRect.h > existingRect.y
    ) {
      return true; // Overlapping
    }
  }
  return false; // Not overlapping
}
function drawRectangle(rectangle) {
  fill(rectangle.col);
  noStroke();
  rect(rectangle.x, rectangle.y, rectangle.w, rectangle.h);
}
function drawBorder() {
  stroke(backgroundColor);
  noFill();
  strokeWeight(borderSize);
  rect(borderSize / 2, borderSize / 2, width - borderSize, height - borderSize);
}