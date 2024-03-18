import { transform } from "typescript";
import { inCheck } from "../rules/InCheck";
import { boardSquareProps, coordinate, piece_type, side } from "../types";
import { change_board } from "./BoardStuff";
import { dfs_move } from "./DFSboard";
import { knight_out_of_check } from "./KnightMoves";
import { pawn_out_of_check} from "./PawnMoves";



export const check_mate_board = (board: boardSquareProps[][], king_coord: coordinate, color: side) => {
    const bishop_moves = [[1,1],[1,-1],[-1,1],[-1,-1]];
    const rook_moves = [[1,0],[-1,0],[0,1],[0,-1]];
    const queen_moves = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
    //checking to look through my board and see the results 
    for (const row of board) {
        for (const square of row) {
            //If we do not have a piece here we just continue the for loop 
            if (square.pieceType === undefined){
                continue;
            }
            const curr_coord = { x: square.pieceType?.curr.x, y: square.pieceType.curr.y };

            if (square.pieceType?.piece === piece_type.Bishop && square.pieceType.color !== color) {
                const res = dfs_move(curr_coord, board, king_coord, bishop_moves, color);
                if (res) {
                    return false;
                }
            }
            if (square.pieceType?.piece === piece_type.Rook && square.pieceType.color !== color) {
                const res = dfs_move(curr_coord, board, king_coord, rook_moves, color);
                if (res) {
                    return false;
                }
            }
            if (square.pieceType?.piece === piece_type.Queen && square.pieceType.color !== color) {
                const res = dfs_move(curr_coord, board, king_coord, queen_moves, color);
                if (res) {
                    return false;
                }
            }
            if (square.pieceType?.piece === piece_type.Knight && square.pieceType.color !== color) {
                const res = knight_out_of_check(curr_coord, board, king_coord);
                if (res) {
                    return false;
                }
            }
            if (square.pieceType?.piece === piece_type.Pawn && square.pieceType.color !== color) {
                const res = pawn_out_of_check(curr_coord, board, king_coord);
                if (res) {
                    return false;
                }
            }
        }
    }

    return true;
}
