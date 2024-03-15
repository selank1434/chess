import { boardSquareProps, coordinate } from "../types";
import { inCheck } from "./InCheck";

export const check_mate = (king_coord: coordinate, board: boardSquareProps[][]) => {

    //first check is to see if all moves my king is still in check 
    
}




//Now I will take a look at wether 
const blocking_prevention = () => {

}




//this function checks if the king has no move to go to 
const no_king_move = (king_coord: coordinate, board: boardSquareProps[][]) => {

    const pairs: [number, number][] = [
        [1, 1], [1, 0], [1, -1],
        [0, 1],[0, -1],
        [-1, 1], [-1, 0], [-1, -1]
    ];

    pairs.forEach(pair => {
        const king_move: coordinate = {x: king_coord.x+ pair[0], y: king_coord.y+pair[1]};
        if(!inCheck(king_move,board)){
            return false
        }
    })

}