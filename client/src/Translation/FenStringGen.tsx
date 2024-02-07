import { boardSquareProps, piece_type, side } from "../types";
//given an input 
export const generate_fen_string = (board: boardSquareProps[][]) => {

   let fenString  = "";
    board.forEach(row => {
        let count = 0; // Initialize count variable for each row
        let end = 8;
        row.forEach(col => {
            //Ok problem is that 
            if (!col.occupied) {
                count++;
            }
            else{
       
                if(count !== 0){
                    end-=count
                    fenString+=count.toString();
                }
            
                fenString+=add_to_fen_string(col);
                end-=1
                count = 0;
            }
        });
        //here we also need to get the remaining numbers
        if(end != 0){
            fenString+=end.toString();
        }
        fenString+="/";
    });

    return encodeURI(fenString.slice(0, -1));                              
}

const add_to_fen_string = (boardSquare: boardSquareProps) => {
    
    if(boardSquare.pieceType?.piece === piece_type.Rook){
        return boardSquare.pieceType.color === side.black ? 'r' : 'R';
    }
    else if(boardSquare.pieceType?.piece === piece_type.Bishop){
        return boardSquare.pieceType.color === side.black ? 'b' : 'B';
    }
    else if (boardSquare.pieceType?.piece === piece_type.King){
        return boardSquare.pieceType.color === side.black ? 'k' : 'K';
    }
    else if (boardSquare.pieceType?.piece === piece_type.Queen){
        return boardSquare.pieceType.color === side.black ? 'q' : 'Q';
    }
    else if(boardSquare.pieceType?.piece === piece_type.Pawn){
        return boardSquare.pieceType.color === side.black ? 'p' : 'P';
    }
    else{
        return boardSquare.pieceType?.color === side.black ? 'n' : 'N';
    }
}