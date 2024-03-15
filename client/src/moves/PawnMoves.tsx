import { change_board } from "../moves/BoardStuff";
import { inCheck } from "../rules/InCheck";
import { coordinate, piece_type, side, boardSquareProps, piece } from "../types";

function isValidMove(x: number, y: number): boolean {
    return x >= 0 && x <= 7 && y >= 0 && y <= 7;
}

function possiblePawnMoves(pawn_coord: coordinate , board: boardSquareProps[][]): coordinate[] {
    const moves: coordinate[] = [];
    const x = pawn_coord.x;
    const y = pawn_coord.y;
    const piece = board[pawn_coord.x][pawn_coord.y].pieceType;
    if (piece === undefined){
        return [];
    }
    
    if (piece.color === side.black) {
        if (y === piece.start.y && !board[x][y + 1].occupied && !board[x][y + 2].occupied) {
            moves.push({ x, y: y + 2 })
        }
        if (y < 7 && !board[x][y + 1].occupied) {
            moves.push({ x, y: y + 1 });
        }
        if (x > 0 && y < 7 && board[x - 1][y + 1].occupied && board[x - 1][y + 1].pieceType!.color !== side.black) {
            moves.push({ x: x - 1, y: y + 1 });
        }
        if (x < 7 && y < 7 && board[x + 1][y + 1].occupied && board[x + 1][y + 1].pieceType!.color !== side.black) {
            moves.push({ x: x + 1, y: y + 1 });
        }
    }

    if (piece.color === side.white) {
        if (y === piece.start.y && !board[x][y - 1].occupied && !board[x][y - 2].occupied) {
            moves.push({ x, y: y - 2 });
        }
        if (y > 0 && !board[x][y - 1].occupied) {
            moves.push({ x, y: y - 1 });
        }
        if (x > 0 && y > 0 && board[x - 1][y - 1].occupied && board[x - 1][y - 1].pieceType!.color !== side.white) {
            moves.push({ x: x - 1, y: y - 1 });
        }
        if (x < 7 && y > 0 && board[x + 1][y - 1].occupied && board[x + 1][y - 1].pieceType!.color !== side.white) {
            moves.push({ x: x + 1, y: y - 1 });
        }
    }

    return moves.filter(move => isValidMove(move.x, move.y));
}

export const find_pawn_move = (pawn_coord: coordinate, board: boardSquareProps[][], king_coord: coordinate) => {
    const moves = possiblePawnMoves(pawn_coord,board);
    moves.forEach(move => {
        const newBoard = change_board(board,pawn_coord,move);
        if(!inCheck(king_coord,newBoard)){
            return true;
        }
    })
    return false;
}
