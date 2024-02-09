//mak a recursive function call that goes diagonal

import { dir } from "console";
import { boardSquareProps, coordinate, piece_type, side } from "../types";


const helper = (direction: String, board: boardSquareProps[][], x: number, y: number, color: side): boolean => {
    if (board[x][y].pieceType?.color === color ){
        return false;
    }
    if (board[x][y].pieceType?.piece === piece_type.Bishop ){
        return true;
    }

    return bishop_find(direction,board,x+1,y+1,color);
}


const bishop_find = (direction: String, board: boardSquareProps[][], x: number, y: number, color: side| undefined): boolean => {
    //out of bounds check we did not find what we are looking for return false
    if(x < 0 || x > 7 || y < 0 || y > 7){
        return false;
    }
    if (color === undefined){
        console.error("You did not give a correcting king coord for bishop_check check");
        return false;
    }

    if(direction === 'SE'){
        //ok we have a blocker king is protected
        return helper(direction,board,x+1,y+1,color);
        //this is going to be the case that 

    }
    else if (direction === 'SW'){
        return helper(direction,board,x-1,y+1,color);
    }
    else if (direction === 'NW'){
        return helper(direction,board,x-1,y-1,color);
    }
    else{
        return helper(direction,board,x+1,y-1,color);
    }
    
    
}

const bishop_check = (king_coordinate: coordinate, board: boardSquareProps[][]) => {
    
    const side = board[king_coordinate.x][king_coordinate.y].pieceType?.color;
    const directions = ["NW","NE", "SW", "SE"];
    directions.forEach (dir => {
        if(bishop_find(dir,board,king_coordinate.x,king_coordinate.y,side)){
            return true;
        }
    })
    return false;
}
