import { start } from "repl";
import { boardSquareProps, coordinate } from "../types";



const hasObstacle = (grid: boardSquareProps[][], x1: number, y1: number, x2: number, y2: number): boolean =>{

    if (x1 === x2 && y1 === y2) {
        alert("fails here");
        return false;
    }


    if (x1 === x2) {  
        const [startRow, endRow] = y1 < y2 ? [y1, y2] : [y2, y1];
        for (let y = startRow + 1; y < endRow; y++) {
            if (grid[x1][y].occupied) {
                return true;
            }
        }
    } else {  
        const [startCol, endCol] = x1 < x2 ? [x1, x2] : [x2, x1];
        console.log("My starter index is: ", startCol);
        console.log("My ender index is ", endCol);
        for (let x = startCol + 1; x < endCol; x++) {
            console.log("index: x: ",y1, "" )
            if (grid[x][y1].occupied === true) {
                console.log("this locale is full")
                return true;
            }
        }
    }

    return false;  
}





export const move_rook = (start: coordinate, end: coordinate, board: boardSquareProps[][]) => {
    if(start.x !== end.x && start.y !== end.y){
        return false;
    }    
    const res = hasObstacle(board,start.x,start.y,end.x,end.y);
    console.log(res);
    if(res === true){
        alert("brooo");
        return false;
    }
    return !res;
    
    // const x = clear_straight_path(start,end,board);
    // console.log(x);
    // return clear_straight_path(start,end,board);
    

}