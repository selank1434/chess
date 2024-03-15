import { inCheck } from "../rules/InCheck";
import { coordinate, boardSquareProps, side } from "../types";
import { change_board } from "./BoardStuff";

const inBound = (coord: coordinate) => {
    return !(coord.x < 0 || coord.x > 7 || coord.y < 0 || coord.y > 7);
}


const found_legal_move = (piece_start: coordinate, piece_end: coordinate, board: boardSquareProps[][], transform: number[], king_coord: coordinate, color: side): boolean => {
    //we have traversed outside of our tree 
    if(!inBound(piece_start) || !inBound(piece_end)){
        return false;
    }
    const next_coord = {x: piece_end.x+transform[0], y: piece_end.y+transform[1]}
    //If this square has a piece the same color as me I can not move here anyway skip to next call 
    if(board[piece_end.x][piece_end.y].occupied && board[piece_end.x][piece_end.y].pieceType?.color === color){
        return found_legal_move(piece_start,next_coord,board,transform,king_coord,color);
    }
    const pot_board = change_board(board,piece_start,piece_end);
    //before we make this mov
    if(!inCheck(king_coord,pot_board)){
        return true;
    }

    return found_legal_move(piece_start,next_coord,board,transform,king_coord,color);
}
export const dfs_move = (piece: coordinate, board: boardSquareProps[][], king_coord: coordinate, moves: number[][], color: side ) => {
    moves.forEach(move => {
        const piece_end: coordinate = {x: piece.x+move[0], y: piece.y+move[1]};
        const res = found_legal_move(piece,piece_end,board,move,king_coord,color);
        if(res){
            return true;
        }
    })
    return false;

}