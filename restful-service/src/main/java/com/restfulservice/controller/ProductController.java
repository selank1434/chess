package com.restfulservice.controller;
import com.restfulservice.model.piece;
import com.restfulservice.model.board;
import com.restfulservice.model.board_square;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class ProductController {

    board chessBoard = new board();
    
    @GetMapping("/")
    public String hello(){
        return "Hello wolrd";
    }
    @PostMapping("/piece")
    public piece createPiece(@RequestBody piece pieceRequest) {
        
        
        // Here you can handle the piece creation logic
        // You can access the piece type from the pieceRequest object
        // You can return a response indicating the successful creation of the piece
        return pieceRequest;
    }
    
    @GetMapping("/getSquare")
    public board_square showBoard(){
        return chessBoard.getBoard_square(0,0);
    }
}
