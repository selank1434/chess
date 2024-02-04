package com.restfulservice.model;

public class piece {
    private piece_type pieceType;
    private color side;

    public piece(piece_type pieceType, color side) {
        this.pieceType = pieceType;
        this.side = side;
    }

    public piece_type getPieceType() {
        return pieceType;
    }

    public color getSide() {
        return side;
    }
}
