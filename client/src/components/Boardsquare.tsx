import React from 'react';
import black from '../static_elements/black-square.jpg';
import white from '../static_elements/white_square.png';
import black_pawn from '../static_elements/tester.jpeg';
import Tile from './Tile';
import Piece from './Piece';
import { boardSquareProps, coordinate, piece_type } from '../types';
import { useDroppable } from '@dnd-kit/core';



const overlayStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '20px', // Adjust width and height according to your needs
  height: '20px',
};

const gridItemStyle: React.CSSProperties = {
  position: 'relative',
  width: '50px', // Adjust width and height according to your needs
  height: '50px',
};


//every borad square needs to know about parent board state otherewise 
const Boardsquare = (board: boardSquareProps[][], coord: coordinate, setBoardState: React.Dispatch<React.SetStateAction<boardSquareProps[][]>>) => {
  
  const id = `${coord.x}${coord.y}`;



  const currSquare = board[coord.x][coord.y];
  if(currSquare.pieceType === undefined){
    return (
      <div style={gridItemStyle}>
      {Tile({board,coord,setBoardState})}
    </div>
    )
  }
  return (
    <div style={gridItemStyle}>

      {Tile({board,coord,setBoardState})}
      {currSquare.occupied ? <Piece board={board} setBoardState={setBoardState} coord={coord}/> : null}
    </div>
  );
};

export default Boardsquare;

