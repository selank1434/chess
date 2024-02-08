export enum piece_type {
    Rook = 0,
    Knight,
    Bishop,
    Queen,
    King,
    Pawn
  }
export enum side{
    black,
    white
}

export interface coordinate{
    x: number,
    y: number
}




export interface boardProps {
    board: boardSquareProps[][],
    coord: coordinate,
    setBoardState: React.Dispatch<React.SetStateAction<boardSquareProps[][]>>
}

//board squares do not move we just keep the same index 
//to move a board square we get a occupied a color and a piece type why the hell does the piece have a coordinate 
//just 


export interface piece{
    color: side,
    piece: piece_type,
    start: coordinate,
    curr: coordinate
    src: string
}

export interface boardSquareProps{
    occupied: Boolean,
    pieceType?:piece
}

