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
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.bind.annotation.CrossOrigin;


import org.springframework.beans.factory.annotation.Autowired;



@RestController
public class ProductController {

    board chessBoard = new board();


    private Process process;
    private PrintWriter writer;
    private BufferedReader reader;

    @Autowired
    public ProductController() {
        try {
            process = Runtime.getRuntime().exec("stockfish");
            writer = new PrintWriter(process.getOutputStream());
            reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    @CrossOrigin(origins = "http://localhost:3000")
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

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/analyze")
    public String analyzeChess(@RequestParam("depth") String depth,@RequestParam("fen") String fen) {
        try{
            writer.println("uci");
            writer.flush();
            String res = "";
 
            String response = reader.readLine();
            while (response != null && !response.equals("uciok")) {
                res += response;
                response = reader.readLine();
            }
            System.out.println(fen);
    
            writer.println("position fen "+fen);
            writer.println("go depth "+depth);
            writer.flush();
            while (response != null && !response.startsWith("bestmove")) {
                System.out.println(response);
                res += response;
                response = reader.readLine();
            }
            return response;
        }
        catch (IOException e){
            System.err.println(e);
            return "errror";
        }

    }
    

    
}

