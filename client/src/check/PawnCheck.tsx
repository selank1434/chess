//I need to check if 

import { boardSquareProps, coordinate, piece_type, side } from "../types";


export const pawn_check = (board: boardSquareProps[][], king_coord: coordinate) => {
    //I only care about white moves ot check because otherwise what is the point 

    const topLeft = board[king_coord.x-1][king_coord.y+1].pieceType;
    const topRight = board[king_coord.x-1][king_coord.y-1].pieceType;
    if(topLeft?.color === side.black  && topLeft.piece === piece_type.Pawn){
        return true;
    }
    if(topRight?.color === side.black && topLeft?.piece === piece_type.Pawn){
        return true;
    }
   
    return false;
}