import { transform } from "typescript";
import { inCheck } from "../rules/InCheck";
import { boardSquareProps, coordinate, piece_type, side } from "../types";
import { change_board } from "./BoardStuff";
import { dfs_move } from "./DFSboard";
import { findKnightMoves } from "./KnightMoves";
import { find_pawn_move } from "./PawnMoves";



export const check_mate_board = (board: boardSquareProps[][], king_coord: coordinate, color: side) => {

     const bishop_moves = [[1,1],[1,-1],[-1,1],[-1,-1]];
     const rook_moves = [[1,0],[-1,0],[0,1],[0,-1]];
     const queen_moves =  [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];

    board.forEach((row,i) => row.forEach((square,j) => {
        const curr_coord: coordinate = {x: i, y: j}
        if(square.pieceType?.piece === piece_type.Bishop && square.pieceType.color === color){
            const res = dfs_move(curr_coord,board,king_coord,bishop_moves,color);
            if (res){
                return false;
            }
        }
        if(square.pieceType?.piece === piece_type.Rook && square.pieceType.color === color){
            const res = dfs_move(curr_coord,board,king_coord,rook_moves,color);
            if (res){
                return false;
            }
        }
        if(square.pieceType?.piece === piece_type.Queen && square.pieceType.color === color){
            const res = dfs_move(curr_coord,board,king_coord,queen_moves,color);
            if (res){
                return false;
            }
        }
        if(square.pieceType?.piece === piece_type.Knight && square.pieceType.color === color){
            const res = findKnightMoves(curr_coord,board,king_coord);
            if(res){
                return false;
            }
        }
        if(square.pieceType?.piece === piece_type.Pawn && square.pieceType.color === color){
            const res = find_pawn_move(curr_coord,board,king_coord);
            if(res){
                return false;
            }
        }
    }))
    return true;
}