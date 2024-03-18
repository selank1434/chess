import { coordinate, boardSquareProps, side, piece_type } from "../types";

const king_protected = (bishops: coordinate[], king_coord: coordinate, board: boardSquareProps[][]): boolean => {
    let isKingProtected = false;

    bishops.forEach(bishop_coord => {
        if (Math.abs(king_coord.x - bishop_coord.x) === Math.abs(king_coord.y - bishop_coord.y)) {
            const stepX = king_coord.x < bishop_coord.x ? 1 : -1;
            const stepY = king_coord.y < bishop_coord.y ? 1 : -1;
            let nextX = bishop_coord.x + stepX;
            let nextY = bishop_coord.y + stepY;
            while (nextX >= 0 && nextX < board.length && nextY >= 0 && nextY < board[0].length && (nextX !== king_coord.x || nextY !== king_coord.y)) {
                if (board[nextX][nextY].occupied) {
                    isKingProtected = true;
                    break;
                }
                nextX += stepX;
                nextY += stepY;
            }
        }
    });

    return isKingProtected;
}


export const bishop_check = (king_coord: coordinate, board: boardSquareProps[][]): boolean => {
    const color = board[king_coord.x][king_coord.y].pieceType?.color;
    const opponentColor = color === side.white ? side.black : side.white;
    const bishops = find_bishops(board, opponentColor);
    return !king_protected(bishops, king_coord, board);
}

const find_bishops = (board: boardSquareProps[][], color: side): coordinate[] => {
    const bishops: coordinate[] = [];

    board.forEach((row, y) => {
        row.forEach((square, x) => {
            if (square.occupied) {
                const piece = square.pieceType;
                if (piece && piece.piece === piece_type.Bishop && piece.color === color) {
                    bishops.push({ x, y });
                }
            }
        });
    });

    return bishops;
}
