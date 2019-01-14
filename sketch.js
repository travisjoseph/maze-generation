var rows, cols;
var w = 40;
var grid = [];
var stack = [];
var currentCell;

function setup() {
  createCanvas(800, 800);
  rows = height/w;
  cols = width/w;
  for (let j = 0; j < rows; j++) {
    for(let i=0; i < cols; i++){
      grid.push(new Cell(i,j));
    }
  }
  currentCell = grid[0];
}

function draw() {
  // frameRate(5);
  background(67);
  
  if (!currentCell.findNeighbours()) {
    currentCell.setVisited();
    stack.push(currentCell);
    currentCell = grid[currentCell.getRandomNeighbour()];
    currentCell.breakWall(stack[stack.length-1]);
  } else {
    currentCell.setVisited();
    console.log("END");
    noLoop();
  }
  
  for(let i=0; i<grid.length; i++){
    grid[i].show(w);
  }
}
