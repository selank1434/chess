import { check_mate_board } from './moves/Checkmate'; // Adjust the path as needed
import { boardSquareProps, coordinate, piece_type, side } from './types'; // Adjust the path as needed

describe('check_mate_board function', () => {
    it('should return true for a board with a checkmate scenario', () => {
        const board: boardSquareProps[][] = [
            // Rank 8
            [
                { occupied: true, pieceType: { color: side.black, piece: piece_type.Rook, start: { x: 0, y: 7 }, curr: { x: 0, y: 7 }, src: "" } },
                { occupied: true, pieceType: { color: side.black, piece: piece_type.Knight, start: { x: 1, y: 7 }, curr: { x: 1, y: 7 }, src: "" } },
                { occupied: false },
                { occupied: false },
                { occupied: false },
                { occupied: false },
                { occupied: true, pieceType: { color: side.black, piece: piece_type.Pawn, start: { x: 6, y: 7 }, curr: { x: 6, y: 7 }, src: "" } },
                { occupied: true, pieceType: { color: side.black, piece: piece_type.Rook, start: { x: 7, y: 7 }, curr: { x: 7, y: 7 }, src: "" } }
            ],
            // Rank 7
            [
                { occupied: true, pieceType: { color: side.black, piece: piece_type.Pawn, start: { x: 0, y: 6 }, curr: { x: 0, y: 6 }, src: "" } },
                { occupied: true, pieceType: { color: side.black, piece: piece_type.Pawn, start: { x: 1, y: 6 }, curr: { x: 1, y: 6 }, src: "" } },
                { occupied: false },
                { occupied: false },
                { occupied: false },
                { occupied: false },
                { occupied: false },
                { occupied: false }
            ],
            // Ranks 6-3 (Empty)
            [
                { occupied: false },
                { occupied: false },
                { occupied: false },
                { occupied: false },
                { occupied: false },
                { occupied: false },
                { occupied: false },
                { occupied: false }
            ],
            [
                { occupied: false },
                { occupied: false },
                { occupied: false },
                { occupied: false },
                { occupied: false },
                { occupied: false },
                { occupied: false },
                { occupied: false }
            ],
            [
                { occupied: false },
                { occupied: false },
                { occupied: false },
                { occupied: false },
                { occupied: false },
                { occupied: false },
                { occupied: false },
                { occupied: false }
            ],
            [
                { occupied: false },
                { occupied: false },
                { occupied: false },
                { occupied: false },
                { occupied: false },
                { occupied: false },
                { occupied: false },
                { occupied: false }
            ],
            // Rank 2
            [
                { occupied: true, pieceType: { color: side.white, piece: piece_type.Pawn, start: { x: 0, y: 1 }, curr: { x: 0, y: 1 }, src: "" } },
                { occupied: true, pieceType: { color: side.white, piece: piece_type.Pawn, start: { x: 1, y: 1 }, curr: { x: 1, y: 1 }, src: "" } },
                { occupied: false },
                { occupied: false },
                { occupied: false },
                { occupied: false },
                { occupied: false },
                { occupied: false }
            ],
            // Rank 1
            [
                { occupied: true, pieceType: { color: side.white, piece: piece_type.Rook, start: { x: 0, y: 0 }, curr: { x: 0, y: 0 }, src: "" } },
                { occupied: true, pieceType: { color: side.white, piece: piece_type.Knight, start: { x: 1, y: 0 }, curr: { x: 1, y: 0 }, src: "" } },
                { occupied: true, pieceType: { color: side.white, piece: piece_type.Bishop, start: { x: 2, y: 0 }, curr: { x: 2, y: 0 }, src: "" } },
                { occupied: true, pieceType: { color: side.white, piece: piece_type.King, start: { x: 3, y: 0 }, curr: { x: 3, y: 0 }, src: "" } },
                { occupied: true, pieceType: { color: side.white, piece: piece_type.Queen, start: { x: 4, y: 0 }, curr: { x: 4, y: 0 }, src: "" } },
                { occupied: true, pieceType: { color: side.white, piece: piece_type.Bishop, start: { x: 5, y: 0 }, curr: { x: 5, y: 0 }, src: "" } },
                { occupied: true, pieceType: { color: side.white, piece: piece_type.Knight, start: { x: 6, y: 0 }, curr: { x: 6, y: 0 }, src: "" } },
                { occupied: true, pieceType: { color: side.white, piece: piece_type.Rook, start: { x: 7, y: 0 }, curr: { x: 7, y: 0 }, src: "" } }
            ]
        ];
        
        
            
        const kingCoord: coordinate = { x: 3, y: 0 }; 
        const color: side = side.white; 
        const result = check_mate_board(board, kingCoord, color);
        expect(result).toBe(true);

    });

    // it('should return false for a board without a checkmate scenario', () => {
    //     // Define your test board without a checkmate scenario
    //     const board: boardSquareProps[][] = [
    //         // Define your board here
    //     ];

    //     // Define other necessary variables like king coordinates and color
    //     const kingCoord: coordinate = { x: 0, y: 0 }; // Adjust coordinates as needed
    //     const color: side = side.white; // Adjust color as needed

    //     // Call the function and assert the result
    //     const result = check_mate_board(board, kingCoord, color);
    //     expect(result).toBe(false);
    // });
});
