import React from 'react';
import { boardSquareProps } from '../types';
import Boardsquare from './Boardsquare';

interface ChessboardProps {
  board: boardSquareProps[][];
  setBoardState: React.Dispatch<React.SetStateAction<boardSquareProps[][]>>;
}

const grab_piece = (e: React.MouseEvent) => {
    const element = e.target as HTMLElement;
    if(element.classList.contains("piece")){
      console.log(e.screenX);
      element.style.position="absolute";
      element.style.left = `${e.clientX}px`;
      element.style.top = `${e.clientY}px`;
    }
}





const Chessboard: React.FC<ChessboardProps> = ({ board, setBoardState }) => {
  const generateBoardSquare = () => {
    const grid: JSX.Element[] = [];
    board.forEach((row, i) =>
      row.forEach((col, j) =>
        grid.push(Boardsquare(board,{x: i, y: j},setBoardState))
      )
    );

    return grid;
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '0' }}>
      {generateBoardSquare()}
    </div>
  );
};

export default Chessboard;
