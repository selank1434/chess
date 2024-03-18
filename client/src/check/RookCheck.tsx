import { boardSquareProps, coordinate, piece_type, side } from "../types";

const helper = (direction: string, board: boardSquareProps[][], x: number, y: number, color: side): boolean => {
    if (board[x][y].pieceType?.piece !== piece_type.Rook){
        return true;
    }
    if (board[x][y].pieceType?.color === color ){
        return false;
    }
    if (board[x][y].pieceType?.piece === piece_type.Rook){
        return true;
    }
    return rook_find(direction, board, x, y, color);
}

const rook_find = (direction: string, board: boardSquareProps[][], x: number, y: number, color: side | undefined): boolean => {
    if (x < 0 || x > 7 || y < 0 || y > 7) {
        return false; // Out of bounds, no rook found
    }
    if (color === undefined) {
        console.error("You did not provide a correct king coordinate for rookCheck.");
        return false;
    }

    if (direction === 'S') {
        return helper(direction, board, x + 1, y, color);
    } else if (direction === 'N') {
        return helper(direction, board, x - 1, y, color);
    } else if (direction === 'W') {
        return helper(direction, board, x, y - 1, color);
    } else {
        return helper(direction, board, x, y + 1, color);
    }
}

export const rookCheck = (king_coord: coordinate, board: boardSquareProps[][]) => {
    const directions = ["N", "S", "W", "E"];
    const color = board[king_coord.x][king_coord.y].pieceType?.color;

    for (const dir of directions) {
        if (rook_find(dir, board, king_coord.x, king_coord.y, color)) {
            return true; 
        }
    }
    return false; 
}
