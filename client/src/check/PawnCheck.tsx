import { boardSquareProps, coordinate, side, piece_type } from "../types";


//Ok I am going to check my king_c
export const pawn_check = (board: boardSquareProps[][], king_coord: coordinate): boolean => {

    if(board[king_coord.x][king_coord.y].pieceType?.color === side.black){
        //black king look dia
        if(board[king_coord.x+1][king_coord.y+1].pieceType?.color === side.white && board[king_coord.x+1][king_coord.y+1].pieceType?.piece === piece_type.Pawn){
            return true;
        }
        if(board[king_coord.x+1][king_coord.y-1].pieceType?.color === side.white && board[king_coord.x+1][king_coord.y-1].pieceType?.piece === piece_type.Pawn){
            return true;
        }
    }
    else{
        if(board[king_coord.x-1][king_coord.y+1].pieceType?.color === side.black && board[king_coord.x+1][king_coord.y+1].pieceType?.piece === piece_type.Pawn){
            return true;
        }
        if(board[king_coord.x-1][king_coord.y-1].pieceType?.color === side.black && board[king_coord.x+1][king_coord.y-1].pieceType?.piece === piece_type.Pawn){
            return true;
        }
    }
    return false;
    
}
