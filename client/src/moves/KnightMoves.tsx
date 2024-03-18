import { inCheck } from "../rules/InCheck";
import { boardSquareProps, coordinate, piece_type } from "../types";
import { change_board } from "./BoardStuff";

const isValidMove = (x: number, y: number): boolean =>{
    return x >= 0 && x < 8 && y >= 0 && y < 8;
}



export const knight_out_of_check = (knight_coord: coordinate, board: boardSquareProps[][], king_coord: coordinate)  =>{
    const moves: coordinate[] = [];
    const dx = [-2, -1, 1, 2, 2, 1, -1, -2];
    const dy = [1, 2, 2, 1, -1, -2, -2, -1];

    for (let i = 0; i < dx.length; i++) {
        const newX = knight_coord.x + dx[i];
        const newY = knight_coord.y + dy[i];
        if (isValidMove(newX, newY)) {
            moves.push({ x: newX, y: newY });
        }
    }
    moves.forEach(move => {
        const res = !inCheck(king_coord,change_board(board,knight_coord,move));
        if (res){
            return true;
        }
    })
    return false;
} 