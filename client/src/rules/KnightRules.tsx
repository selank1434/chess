import { coordinate, side, boardSquareProps,piece } from "../types";

export const movingKnight = (piece: piece | undefined, start: coordinate, end: coordinate) => {
    if (piece === undefined){
        console.log("failig here")
        return false;
    }


        
        //vertical L 
        if(Math.abs(start.x-end.x) === 1  &&  Math.abs(start.y-end.y) === 2){
            return true;
        }
        return Math.abs(start.x-end.x) === 2  &&  Math.abs(start.y-end.y) === 1;
    



}

