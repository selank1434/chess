
import { boardSquareProps } from "../types";
import { generate_fen_string } from "./FenStringGen";
import axios from 'axios';

// Define the URL of your Java endpoint

//from here once drop is the 
export const getAImove = (board: boardSquareProps[][]) =>{
    const url = 'http://localhost:8080/analyze';
    // Define the parameters for the request
    const params = {
        depth: '5', // Example depth value
        fen: generate_fen_string(board) // Example FEN string
    };
    
    
    // Make the Axios GET request
    axios.get(url, { params })
        .then((response: { data: any; }) => {
            console.log('Response:', response.data);
            // Handle the response data as needed
        })
        .catch((error: any) => {
            console.error('Error:', error);
            // Handle errors if any
        });
}
