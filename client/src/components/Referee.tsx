//This is just going to be a function 

import { boardSquareProps, coordinate, piece, piece_type, side } from "../types";
import { pawn_move } from "../rules/PawnRules";
import { movingKnight } from "../rules/KnightRules";
import { bishop_move } from "../rules/BishopRules";
import { move_rook } from "../rules/RookRules";
import { movingQueen } from "../rules/QueenRules";

export const referee = (start: coordinate, end: coordinate, board: boardSquareProps[][]) => {

    console.log("starting coordinate x: ", start.x, " y: ", start.y);
    console.log("ending coordinate x: ", end.x, " y: ", end.y);
    const piece = board[start.x][start.y].pieceType
    if (board[end.x][end.y].occupied && board[start.x][start.y].pieceType?.color === board[end.x][end.y].pieceType?.color){
        return false;
    }
    if (piece === undefined){
        console.log("failing here");
        return false;
    }
    if (piece.piece === piece_type.Pawn){
        //now we need to check if the pawn is ;
        return pawn_move(start,end,board);
        
    }
    else if(piece.piece === piece_type.Knight){
        return movingKnight(piece,start,end);
    }
    else if(piece.piece === piece_type.Bishop){
        return bishop_move(start,end,board);
    }
    else if(piece.piece === piece_type.Rook){
        const res = move_rook(start,end,board);
        return res;
        // return move_rook(start,end,board);
    }
    else if(piece.piece === piece_type.Queen){
       return movingQueen(start,end,board);
    }
    else{
        
    }

}





