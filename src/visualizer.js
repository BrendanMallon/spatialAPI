let height, width, tree;
let mouseX, mouseY;
let pointList = [];
function spawnPoints(count) {
  for (let i = 0; i < count; i++) {
    pointList.push([
      Math.floor(Math.random() * width),
      Math.floor(Math.random() * height),
    ]);
  }
}

function displayPoints(ctx, pts, color) {
  pts.forEach((point) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(point[0], point[1], 2, 0, 2 * Math.PI);
    ctx.fill();
  });
}

function sizeCanvas() {
  const canvas = document.getElementById("canvas");
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
function displayRangeBox(ctx, w, h) {
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.rect(mouseX - w / 2, mouseY - h / 2, w, h);
  ctx.stroke();
}
function queryKDTree(ctx) {
  let rangeWidth = 180;
  let rangeHeight = 180;
  displayRangeBox(ctx, rangeWidth, rangeHeight);
  let containedPoints = tree.rangeQuery(
    mouseX - rangeWidth / 2,
    mouseY - rangeHeight / 2,
    rangeWidth,
    rangeHeight
  );
  displayPoints(ctx, containedPoints, "#00ee00");
  //console.log(containedPoints);
}
function animationLoop() {
  //displayPoints();
  let ctx = document.getElementById("canvas").getContext("2d");
  ctx.clearRect(0, 0, width, height);
  displayPoints(ctx, pointList, "white");
  queryKDTree(ctx);
  window.requestAnimationFrame(animationLoop);
}
function updateMousePosition(e) {
  const canvas = document.getElementById("canvas");
  let cRect = canvas.getBoundingClientRect();
  mouseX = Math.round(e.clientX - cRect.left);
  mouseY = Math.round(e.clientY - cRect.top);
  // console.log("(" + mouseX + ", " + mouseY + ")");
}
window.onload = () => {
  window.addEventListener("resize", sizeCanvas, false);
  sizeCanvas();
  spawnPoints(10000);
  tree = new kdTree(pointList);
  console.log(tree);
  console.log(tree.rangeQuery(0, 0, 100, 100));
  const canvas = document.getElementById("canvas");
  window.addEventListener("mousemove", updateMousePosition);
  window.requestAnimationFrame(animationLoop);
};
