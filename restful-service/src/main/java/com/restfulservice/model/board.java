//each boardSquare has these properties
package com.restfulservice.model;
import java.util.Optional;

import com.restfulservice.model.board_square;

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
    }
    public board_square getBoard_square(int row, int col){
        return squares[row][col];
    }
    
}
