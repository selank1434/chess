package com.restfulservice.model;

import java.util.Optional;
import com.restfulservice.model.piece;
public class board_square {
    private boolean occupied;
    private Optional<piece> piece;

    public board_square(Optional<piece> piece, boolean occupied) {
        this.piece = piece;
        this.occupied = occupied;
    }

    public Optional<piece> getPiece() {
        return piece;
    }

    public boolean isOccupied() {
        return occupied;
    }
}
