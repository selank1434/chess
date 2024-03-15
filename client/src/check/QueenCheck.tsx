import { boardSquareProps, coordinate, piece_type, side } from "../types";



const helper = (direction: String, board: boardSquareProps[][], x: number, y: number, color: side, rookHelp: boolean): boolean => {
    if (board[x][y].pieceType?.piece !== piece_type.Queen){
        return false;
    }
    if (board[x][y].pieceType?.color === color ){
        return false;
    }
    if (board[x][y].pieceType?.piece === piece_type.Queen){
        return true;
    }
    if(rookHelp){
        return rook_find(direction,board,x,y,color);
    }
    return bishop_find(direction,board,x,y,color);
 
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
        return helper(direction,board,x+1,y+1,color, false);
        //this is going to be the case that 

    }
    else if (direction === 'SW'){
        return helper(direction,board,x-1,y+1,color, false);
    }
    else if (direction === 'NW'){
        return helper(direction,board,x-1,y-1,color, false);
    }
    else{
        return helper(direction,board,x+1,y-1,color, false);
    }
    
    
    
}


const rook_find = (direction: String, board: boardSquareProps[][], x: number, y: number, color: side| undefined): boolean => {
    //out of bounds check we did not find what we are looking for return false
    if(x < 0 || x > 7 || y < 0 || y > 7){
        return false;
    }
    if (color === undefined){
        console.error("You did not give a correcting king coord for bishop_check check");
        return false;
    }

    if(direction === 'S'){
        //ok we have a blocker king is protected
        return helper(direction,board,x+1,y,color, true);
        //this is going to be the case that 

    }
    else if (direction === 'N'){
        return helper(direction,board,x-1,y,color, true);
    }
    else if (direction === 'W'){
        return helper(direction,board,x,y-1,color, true);
    }
    else{
        return helper(direction,board,x,y+1,color,true);
    }
}



export const queen_check = (king_coord: coordinate, board: boardSquareProps[][]) => {
    const directionsRook = ["N","S","W","E"];
    const color = board[king_coord.x][king_coord.y].pieceType?.color
    directionsRook.forEach(dir => {
        if(rook_find(dir,board,king_coord.x,king_coord.y,color)){
            return true;
        }
    })
    const directionsBishop = ["NW","NE", "SW", "SE"];
    directionsBishop.forEach (dir => {
        if(bishop_find(dir,board,king_coord.x,king_coord.y,color)){
            return true;
        }
    })
    return false;
}
