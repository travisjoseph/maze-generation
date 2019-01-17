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
  currentCell.setVisited();
}

function draw() {
  background(67);
  frameRate(10);

  // https://en.wikipedia.org/wiki/Maze_generation_algorithm
  // Make the initial cell the current cell and mark it as visited
  // While there are unvisited cells
  //     If the current cell has any neighbours which have not been visited
  //         Choose randomly one of the unvisited neighbours
  //         Push the current cell to the stack
  //         Remove the wall between the current cell and the chosen cell
  //         Make the chosen cell the current cell and mark it as visited
  //     Else if stack is not empty
  //         Pop a cell from the stack
  //         Make it the current cell
  
  if (currentCell.index != grid.length-1) {
    currentCell.findNeighbours();
    console.log(currentCell);
    
    if(currentCell.getNumNeighbours() > 0){
      var nextCellIndex = currentCell.getRandomNeighbour();
      stack.push(currentCell);
      currentCell.breakWall(grid[nextCellIndex]);
      grid[nextCellIndex].setVisited();
      currentCell = grid[nextCellIndex];
    } else if (stack.length > 0) {
      currentCell = stack[stack.length-1]
      stack.pop();
    }  
  }

  for(let i=0; i<grid.length; i++){
    grid[i].show(w);
  }
}
