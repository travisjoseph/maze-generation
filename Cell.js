class Cell{
    constructor(i, j){
        this.i = i;
        this.j = j;
        this.index = this.getIndex(this.i, this.j);
        this.visited = false;
        this.neighbours = [];
        this.currentCell = false;
        //TOP , RIGHT, BOTTOM, LEFT
        this.walls = [true, true, true, true];
    }
  
    show(){
    
        var x = this.i*w;
        var y = this.j*w;

        if (this.visited == true){
            fill(0, 69, 247);
            noStroke();
            var x = this.i*w;
            var y = this.j*w;
            rect(x, y, w, w);
        }
        if (this.currentCell == true){
            fill(244, 134, 66, 200);
            noStroke();
            var x = this.i*w;
            var y = this.j*w;
            rect(x, y, w, w);
        }
        
        if(this.walls[0]){             //TOP
            strokeWeight(1);
            stroke(247, 82, 0);
            line(x, y, x+w, y);
        } else {
            noStroke();
            line(x, y, x+w, y);
        }

        if(this.walls[1]){             //RIGHT
            strokeWeight(1);
            stroke(247, 82, 0);
            line(x+w, y, x+w, y+w); 
        } else {
            noStroke();
            line(x+w, y, x+w, y+w); 
        }

        if(this.walls[2]){              //BOTTOM
            strokeWeight(1);
            stroke(247, 82, 0);
            line(x+w, y+w, x, y+w); 
        } else {
            noStroke();
            line(x+w, y+w, x, y+w);
        }

        if(this.walls[3]){              //LEFT
            strokeWeight(1);
            stroke(247, 82, 0);
            line(x, y+w, x, y);  
        } else {
            noStroke();
            line(x, y+w, x, y);  
        }
    }

    breakWall(chosenCell){

        //1/-1 indicates a left/right movement 
        //cols/-cols indicates an up/down movement.
        var thisIndex = this.getIndex(this.i, this.j);
        var chosenIndex = this.getIndex(chosenCell.i, chosenCell.j);
        var whichWall = thisIndex - chosenIndex ;
        if(grid[chosenIndex].visited == false){
            switch(whichWall){
                case cols:
                    grid[thisIndex].walls[0] = false;
                    grid[chosenIndex].walls[2] = false;
                    break;
                case -cols:
                    grid[thisIndex].walls[2] = false;
                    grid[chosenIndex].walls[0] = false;
                    break;
                case 1:
                    grid[thisIndex].walls[3] = false;
                    grid[chosenIndex].walls[1] = false;
                    break;
                case -1:
                    grid[thisIndex].walls[1] = false;
                    grid[chosenIndex].walls[3] = false;
                    break;
            }
        }
    }

    setVisited(){
        this.visited = true;
    }

    findNeighbours(){
        //TOP NEIGHBOUR
        var topNeighbour = this.getIndex(this.i-1, this.j);
        if (topNeighbour != -1){
            if(grid[topNeighbour].visited == false) this.neighbours.push(topNeighbour);
        }
        
        //RIGHT NEIGHBOUR
        var rightNeighbour = this.getIndex(this.i, this.j+1);
        if (rightNeighbour != -1){
            if(grid[rightNeighbour].visited == false) this.neighbours.push(rightNeighbour);
        }

        //BOTTOM NEIGHBOUR
        var bottomNeighbour = this.getIndex(this.i+1, this.j);
        if (bottomNeighbour != -1){
            if(grid[bottomNeighbour].visited == false) this.neighbours.push(bottomNeighbour);
        }            

        //LEFT NEIGHBOUR
        var leftNeighbour = this.getIndex(this.i, this.j-1);
        if (leftNeighbour != -1){
            if(grid[leftNeighbour].visited == false) this.neighbours.push(leftNeighbour);
        }           
    }

    getIndex (i, j){
        if(i>=0 && j>=0 && i<rows && j<cols){
            var index = i + j*cols;
            return index;
        } else return -1;
    }

    getRandomNeighbour(){
        var randomNeighbour = this.neighbours[floor(random(0, this.neighbours.length))];
        this.neighbours.splice(this.neighbours.indexOf(randomNeighbour), 1);
        return randomNeighbour;
    }

    getNumNeighbours(){
        return this.neighbours.length;
    }

    // setCurrentCell(){
    //     this.currentCell = true;
    // }

    // setNotCurrentCell(){
    //     this.currentCell = false;
    // }
}