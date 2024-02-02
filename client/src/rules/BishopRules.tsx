import { coordinate, side, boardSquareProps,piece } from "../types";



//taking in the start and end and checking if pieces are in the path 
//DFS ??? no there is three ways to get ther




const clear_diagonal_path= (start: coordinate, end: coordinate, board: boardSquareProps[][], xIncrement: number, yIncrement: number) => {
    
    while (start.x !== end.x && start.y !== end.y){
        start.x+=xIncrement;
        start.y+=yIncrement;
        if(board[start.x][start.y].occupied){
            return false;
        }
    }
    return true
 
}

const find_increments = (start:coordinate, end: coordinate) => {
    if(start.x > end.x && start.y  > end.y){
        return [-1,-1]
    }
    else if(start.x < end.x && start.y > end.y){
        return [1,-1];
    }
    else if(start.x  > end.x  && start.y < end.y){
        return [-1,1];
    }
    else{
        return [1,1];
    }
}




export const bishop_move = (start: coordinate, end:coordinate, board: boardSquareProps[][]) => {
//y and x distance should be the same
if(Math.abs(start.y-end.y) !== Math.abs(start.x-end.x)){
    return false;
}
//This call checks if there are any pieces between me and the next one 


const res: number[]  = find_increments(start,end);
if(clear_diagonal_path(start,end,board,res[0],res[1]) === false){

    return false;
}
//Now check if I can take the 
return true;

//is this enough to mantain diagonal yes????




}