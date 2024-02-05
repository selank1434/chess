//each boardSquare has these properties
package com.restfulservice.model;
import java.util.Optional;

import com.restfulservice.model.board_square;
import com.restfulservice.model.board;
import com.restfulservice.model.piece;
import com.restfulservice.model.piece_type;
import com.restfulservice.model.side;

public class board {
    private board_square[][] squares;

    public board() {
        squares = new board_square[8][8];
        initializeBoard();
    }
    private void initializeBoard() {
        for (int i = 0; i < 8; i++) {
            for (int j = 0; j < 8; j++) {
                squares[i][j] = new board_square(null, false);
            }
        }

        // Place black pawns
        for (int i = 1; i < 2; i++) {
            for (int j = 0; j < 8; j++) {
                piece myPiece = new piece(piece_type.PAWN, side.BLACK);
                squares[i][j] = new board_square(Optional.of(myPiece), true);
            }
        }

        // Place white pawns
        for (int i = 6; i < 7; i++) {
            for (int j = 0; j < 8; j++) {
                piece myPiece = new piece(piece_type.PAWN, side.WHITE);
                squares[i][j] = new board_square(Optional.of(myPiece), true);
            }
        }
    }
    public board_square getBoard_square(int row, int col){
        return squares[row][col];
    }
    public board_square setBoard_square(int row, int col, board_square new_square){
        squares[row][col] = new_square;
        return squares[row][col];
    }
    
}
