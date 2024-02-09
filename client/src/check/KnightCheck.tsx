import { boardSquareProps, coordinate, piece_type, side } from "../types";

const isValidMove = (x: number, y: number): boolean =>{
    return x >= 0 && x < 8 && y >= 0 && y < 8;
}

const knight_check = (board: boardSquareProps[][], moves: coordinate[]) => {
    moves.forEach(coord => {
        const piece = board[coord.x][coord.y].pieceType;
        if (piece?.piece === piece_type.Knight && piece.color === side.black){
            return true;
        }
    })
    return false;
}

const getKnightMoves = (x: number, y: number): coordinate[]  =>{
    const moves: coordinate[] = [];
    const dx = [-2, -1, 1, 2, 2, 1, -1, -2];
    const dy = [1, 2, 2, 1, -1, -2, -2, -1];

    for (let i = 0; i < dx.length; i++) {
        const newX = x + dx[i];
        const newY = y + dy[i];
        if (isValidMove(newX, newY)) {
            moves.push({ x: newX, y: newY });
        }
    }

    return moves;
}