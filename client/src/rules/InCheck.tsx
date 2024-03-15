import { bishop_check } from "../check/BishopCheck";
import { knight_check } from "../check/KnightCheck";
import { pawn_check } from "../check/PawnCheck";
import { queen_check } from "../check/QueenCheck";
import { rookCheck } from "../check/RookCheck";
import { boardSquareProps, coordinate } from "../types";

//I want to change this now so I have a defintion of where to block
export const inCheck = (king_coord: coordinate, board: boardSquareProps[][]) => {
    const coord = {x: 0, y: 5}
    if (bishop_check(coord,board)){
        alert("we think we have a bishop check");
    }
    return bishop_check(coord,board);
}