import React from 'react';

import Tile from './Tile';
import Piece from './Piece';
import { boardProps, boardSquareProps, coordinate, piece_type, side } from '../types';
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
const Boardsquare: React.FC<boardProps> = ({board, coord , setBoardState, setBlackMove}) => {
  const currSquare: boardSquareProps = board[coord.x][coord.y];
  

  if(currSquare.pieceType === undefined){
    return (
      <div style={gridItemStyle}>
      <Tile board={board} coord={coord} setBoardState={setBoardState} setBlackMove={setBlackMove}/>
    </div>
    )
  }
  return (
    <div style={gridItemStyle}>
      <Tile board={board} coord={coord} setBoardState={setBoardState} setBlackMove={setBlackMove}/>
      <Piece {...currSquare.pieceType}/>
    </div>
  );
};

export default Boardsquare;

