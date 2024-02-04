package com.restfulservice.model;

public class piece {
    private piece_type pieceType;
    private side side;

    public piece(piece_type pieceType, side side) {
        this.pieceType = pieceType;
        this.side = side;
    }

    public piece_type getPieceType() {
        return pieceType;
    }

    public side getSide() {
        return side;
    }
}
