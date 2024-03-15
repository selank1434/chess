import { coordinate, side, boardSquareProps,piece } from "../types";

const movingPawn = (piece: piece | undefined, start: coordinate, end: coordinate) => {
    if (piece === undefined){
        return false;
    }
    if(piece.color === side.black){
    
        if(start.x === 1){  

            return start.x-end.x === -1 || start.x-end.x === -2
        }
        return start.x-end.x === -1;
    }
    if(piece.color === side.white){
        if(start.x === 6){
            if((start.x-end.x === 1 || start.x-end.x === 2) === false){
                console.log(start.x-end.x === 1 || start.x-end.x === 2);
            }
            
            return start.x-end.x === 1 || start.x-end.x === 2;
        }

        return start.x-end.x === 1;
    }


}
export const pawn_move = (start: coordinate, end:coordinate, board: boardSquareProps[][]) => {
//moving one forward
const piece = board[start.x][start.y].pieceType
const move_res = movingPawn(piece,start,end);

if (end.y === start.y && move_res && !board[end.x][end.y].occupied){
    return true;
}
//attacking another piece 
else if(Math.abs(end.x-start.x) === 1 && board[end.x][end.y].occupied && move_res){
    return true;
}
//moving two forward initially
else{
    return false;
}



}