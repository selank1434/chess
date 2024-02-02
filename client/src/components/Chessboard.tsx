import React from 'react';
import { boardSquareProps, coordinate, piece_type , side} from '../types';
import Boardsquare from './Boardsquare';





interface ChessboardProps {
  board: boardSquareProps[][];
  setBoardState: React.Dispatch<React.SetStateAction<boardSquareProps[][]>>;
}




const Chessboard: React.FC<ChessboardProps> = ({ board, setBoardState }) => {
  const generateBoardSquare = () => {
    const grid: JSX.Element[] = [];
    board.forEach((row, i) =>
      row.forEach((col, j) =>
        //based on my coordinate I can push the piece 
        grid.push(<Boardsquare board={board} setBoardState={setBoardState} coord={{x: i, y:j}}/>)
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
