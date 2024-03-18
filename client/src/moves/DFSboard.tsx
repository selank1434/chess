import { inCheck } from "../rules/InCheck";
import { coordinate, boardSquareProps, side } from "../types";
import { change_board } from "./BoardStuff";

const inBound = (coord: coordinate): boolean => {
    return coord.x >= 0 && coord.x < 8 && coord.y >= 0 && coord.y < 8;
}

const found_legal_move = (piece_start: coordinate, piece_end: coordinate, board: boardSquareProps[][], transform: number[], king_coord: coordinate, color: side): boolean => {
    if (!inBound(piece_start) || !inBound(piece_end)) {
        return false;
    }
    if(piece_end.x < 0 || piece_end.x > 7 ){
        return false;
    }
    console.log(board);
    if (board[piece_end.x][piece_end.y].occupied && board[piece_end.x][piece_end.y].pieceType?.color === color) {
        const next_coord = { x: piece_end.x + transform[0], y: piece_end.y + transform[1] };
        return found_legal_move(piece_start, next_coord, board, transform, king_coord, color);
    }
    const pot_board = change_board(board, piece_start, piece_end);
    
    if (!inCheck(king_coord, pot_board)) {
        return true;
    }

    const next_coord = { x: piece_end.x + transform[0], y: piece_end.y + transform[1] };
    return found_legal_move(piece_start, next_coord, board, transform, king_coord, color);
}

export const dfs_move = (piece: coordinate, board: boardSquareProps[][], king_coord: coordinate, moves: number[][], color: side): boolean => {
    for (const move of moves) {
        const piece_end: coordinate = { x: piece.x + move[0], y: piece.y + move[1] };
        const res = found_legal_move(piece, piece_end, board, move, king_coord, color);
        if (res) {
            return true; 
        }
    }
    return false;
}
