
import { boardSquareProps } from "../types";
import { generate_fen_string } from "./FenStringGen";
import axios from 'axios';

// Define the URL of your Java endpoint

//from here once drop is the 
export const getAImove = async (board: boardSquareProps[][]) =>{
    const url = 'http://localhost:8080/analyze';
    const params = {
        depth: '5', 
        fen: generate_fen_string(board) 
    };
    try {
        const response = await axios.get(url, { params });
        console.log('Response:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error:', error);
        throw error; 
    }
}
