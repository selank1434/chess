package com.restfulservice.controller;
import com.restfulservice.model.piece;
import org.springframework.web.bind.annotation.RequestParam;

import com.restfulservice.model.board;
import com.restfulservice.model.board_square;

import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;



import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PatchMapping;
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

    //I need ot change this to a patch or put later but whatever
    @GetMapping("/getSquare")
    public board_square showBoard(){
        return chessBoard.getBoard_square(1,0);
    }

    @GetMapping("/analyze")
    public String analyzeChess() {
        try{
            Process process = Runtime.getRuntime().exec("stockfish");

            OutputStream outputStream = process.getOutputStream();
            PrintWriter writer = new PrintWriter(outputStream);
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        
            // Send a command to Stockfish to trigger a response
            writer.println("uci");
            writer.flush();
        
            // Read response from Stockfish
            String res = "";
            String response = reader.readLine();
            while (response != null && !response.equals("uciok")) {
                System.out.println(response);
                res += response;
                response = reader.readLine();
            }
            System.out.println("Made it out");
            // writer.println("position fen rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
            // writer.flush();
            // System.out.println(reader.readLine());

            writer.close();
            reader.close();
            // Destroy the process
            process.destroy();
            return res;
        }
        catch (IOException e){
            System.err.println(e);
            return "errror";
        }

    }
    

    
}

