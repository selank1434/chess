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
import java.net.Socket;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;



import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.bind.annotation.CrossOrigin;


import org.springframework.beans.factory.annotation.Autowired;


import java.net.ServerSocket; // For creating a server socket
import java.net.Socket; // For creating a client socket
import java.net.InetAddress; // For representing IP addresses
import java.io.IOException; // For handling I/O exceptions
import java.io.InputStream; // For reading from a socket
import java.io.OutputStream; // For writing to a socket


@RestController
public class ProductController {

    board chessBoard = new board();


    private Process process;
    private PrintWriter writer;
    private BufferedReader reader;
    private ServerSocket serverSocket;
    
    @Autowired
    public ProductController() {
        try {
            //this is creating a process that will be used to 
            process = Runtime.getRuntime().exec("stockfish");
            writer = new PrintWriter(process.getOutputStream());
            reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            serverSocket = new ServerSocket(6000);
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
            System.out.println("Here is the fen string i got: " +fen);
    
            writer.println("position fen "+fen+ " b");
            writer.println("go depth "+depth);
            writer.flush();
            while (response != null && !response.startsWith("bestmove")) {
                // System.out.println(response);
                res += response;
                response = reader.readLine();
            }
            System.out.println("response: "+response);
            System.out.println("result "+ res);
            return response;
        }
        catch (IOException e){
            System.err.println(e);
            return "errror";
        }

    }
    


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/mate")
    public String acceptConnections() {
        try{
            writer.println("uci");
            writer.flush();
            String res = "";
 
            String response = reader.readLine();
            while (response != null && !response.equals("uciok")) {
                res += response;
                response = reader.readLine();
            }
            String fens = "8/8/8/8/8/8/4k3/4qK2 w - - 0 1";
            writer.println("position fen "+fens + " b");
            writer.println("go depth 5");
            writer.flush();
            while (response != null && !response.startsWith("bestmove")) {
                // System.out.println(response);
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

