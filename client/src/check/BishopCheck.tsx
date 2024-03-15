//I want to make a function that has the following properties 
//If king and bishop on same diagonal check if that diagonal is obstructed

import { boardSquareProps, coordinate, piece_type, side } from "../types";
//
//This function is going to look to see if there is a piece protecting the bishopw 
const king_protected = (bishops: coordinate[], king_coord: coordinate, board: boardSquareProps[][]): boolean => {
    bishops.forEach( bishop_coord => {
        if(Math.abs(king_coord.x-bishop_coord.x) === Math.abs(king_coord.y-bishop_coord.y)){
            //here we now need to check the path properly 
            //now check direction
            const stepX = king_coord.x < bishop_coord.x ? -1: 1;
            const stepY = king_coord.y < bishop_coord.y ? -1 : 1;
            for (let i = 0; i < Math.abs(king_coord.x-bishop_coord.x) ; i++) {
                const nextX = bishop_coord.x + i * stepX;
                const nextY = bishop_coord.y + i * stepY;
                if (board[nextX][nextY].occupied) {
                    // There's a piece blocking the bishop's path no worries 
                    return true;
                }
            }
            return false;
        }
    })
    return true;
}


export const bishop_check = (king_coord: coordinate, board: boardSquareProps[][]) => {
    //ok I have the bishops
    const color = board[king_coord.x][king_coord.y].pieceType?.color;
    if(color === side.black){
        const bishops = find_bishops(board,side.white);
        return !king_protected(bishops,king_coord,board);
        
    }
    else{
        const bishops = find_bishops(board,side.black);
        return !king_protected(bishops,king_coord,board);
    }



}
const find_bishops = (board: boardSquareProps[][],color: side | undefined) => {
    const res: coordinate[] = [];
    board.forEach( row => row.forEach( col => {
        if(col.occupied && col.pieceType?.piece === piece_type.Bishop && col.pieceType.color === color){
            res.push(col.pieceType.curr);
        }
    }))
    return res;
}