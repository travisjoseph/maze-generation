class Cell{
    constructor(i, j){
        this.i = i;
        this.j = j;
        this.visited = false;
        this.neighbours = [];
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

    breakWall(prevCell){

        //1/-1 indicates a left/right movement 
        //cols/-cols indicates an up/down movement.
        var thisIndex = this.getIndex(this.i, this.j);
        var prevIndex = this.getIndex(prevCell.i, prevCell.j);
        var whichWall = thisIndex - prevIndex;

        switch(whichWall){
            case cols:
                this.walls[0] = false;
                prevCell.walls[2] = false;
                break;
            case -cols:
                this.walls[2] = false;
                prevCell.walls[0] = false;
                break;
            case 1:
                this.walls[3] = false;
                prevCell.walls[1] = false;
                break;
            case -1:
                this.walls[1] = false;
                prevCell.walls[3] = false;
                break;
        }
    }

    setVisited(){
        this.visited = true;
    }

    findNeighbours(){
        if (this.visited == false){
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
        if (this.neighbours.length == 0) return true; else false;
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
  }