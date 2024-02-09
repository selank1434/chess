import { coordinate, side, boardSquareProps,piece } from "../types";
import { bishop_move } from "./BishopRules";
import { move_rook } from "./RookRules";

export const movingQueen = (start: coordinate, end:coordinate, board: boardSquareProps[][]) => {

    return bishop_move(start,end,board) || move_rook(start,end,board);



}

