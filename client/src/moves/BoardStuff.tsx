import { boardSquareProps, coordinate } from "../types";


//This function is going to take in a board and two coordinates and move one to the end without touching state 
export const change_board = (board: boardSquareProps[][], coord1: coordinate,  coord2: coordinate) => {
    const coord1_boardSquare = board[coord1.x][coord1.y];
    const coord2_boardSquare = board[coord2.x][coord2.y];

    // Create a new board with the pieces swapped
    const newBoard = [...board];

    newBoard[coord1.x][coord1.y] = coord2_boardSquare;
    newBoard[coord2.x][coord2.y] = coord1_boardSquare;
    return newBoard;
}