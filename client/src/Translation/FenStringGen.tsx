import { boardSquareProps, piece_type,piece,side } from "../types";

export const generateFEN = (board: boardSquareProps[][]): string => {
        
    let fen = '';
    
    for (let row = 0; row < 8; row++) {
        let emptySquares = 0;
        for (let col = 0; col < 8; col++) {
            const square = board[row][col];
            if (square.occupied) {
                if (emptySquares > 0) {
                    fen += emptySquares.toString();
                    emptySquares = 0;
                }
                if(square.pieceType?.piece === piece_type.Rook){
                //    console.log("yeezy");
                //    console.log(pieceToFEN(square.pieceType));
                }
                // console.log("Piece at row: ", row, "col: ", square.pieceType?.piece);
                fen += pieceToFEN(square.pieceType);
            } else {
                emptySquares++;
            }
        }
        if (emptySquares > 0) {
            fen += emptySquares.toString();
        }
        if (row < 7) {
            fen += '/';
        }
    }

    return fen;
};

export const pieceToFEN = (p: piece| undefined): string => {
    if (p === undefined) return ''; // If piece is undefined, return an empty string
    const pieceToFENMap: { [key in piece_type]: string } = {
        [piece_type.Rook]: p.color === side.black ? 'r' : 'R',
        [piece_type.Knight]: p.color === side.black ? 'n': 'N',
        [piece_type.Bishop]:  p.color === side.black ? 'b':'B',
        [piece_type.Queen]:  p.color === side.black ? 'q' :'Q',
        [piece_type.King]: p.color === side.black ? 'k':'K',
        [piece_type.Pawn]: p.color === side.black? 'p':'P',
    };

    const fenRepresentation = pieceToFENMap[p.piece];
    return fenRepresentation;
};

