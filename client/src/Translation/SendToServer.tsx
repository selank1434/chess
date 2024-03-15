
import { boardSquareProps } from "../types";
import { generateFEN } from "./FenStringGen";
import axios from 'axios';

// Define the URL of your Java endpoint

//from here once drop is the 
export const getAImove = async (board: boardSquareProps[][]) =>{
    console.log("AI board 0,0 "+board[0][0].pieceType?.piece)
    console.log(board[5][5].pieceType);
    const url = 'http://localhost:8080/analyze';
    const params = {
        depth: '5', 
        fen: generateFEN(board) 
    };
    console.log("THis is my fen string", generateFEN(board));
    try {
        const response = await axios.get(url, { params });
        console.log('Response:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error:', error);
        throw error; 
    }
}
