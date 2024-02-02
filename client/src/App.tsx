import React, { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import white from "../static_elements/white_square.png";


import './App.css';

import { boardSquareProps, coordinate, piece, piece_type, side } from './types';
import Chessboard from './components/Chessboard';
import Piece from './components/Piece';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import black_pawn from './pawn_b.png';
import white_pawn from './pawn_w.png';
import black_knight from './knight_b.png';
import white_knight from './knight_w.png';
import black_bishop from './bishop_b.png';
import white_bishop from './bishop_w.png';
import black_rook from './rook_b.png';
import white_rook from './rook_w.png';
import black_queen from './queen_b.png';
import white_queen from './queen_w.png';
import black_king from './king_b.png';
import white_king from './king_w.png';






//start with the 

const create_piece = (coord: coordinate, piece: piece_type, src: string, side: side): piece => {

  return  {color: side, piece: piece ,start: coord, curr: coord, src: src};

}

const render_piece = (coord: coordinate) => {
  if(coord.x === 1){
    return create_piece(coord,piece_type.Pawn,black_pawn,side.black);
  }
  else if (coord.x === 6){
    return create_piece(coord,piece_type.Pawn,white_pawn,side.white);
  }
  else if(coord.y === 0 || coord.y === 7){
    return coord.x  === 7 ? create_piece(coord,piece_type.Rook,white_rook, side.white) :create_piece(coord,piece_type.Rook,black_rook,side.black);
  }
  else if(coord.y === 1 || coord.y === 6){
    return coord.x === 7 ? create_piece(coord, piece_type.Knight,white_knight,side.white) : create_piece(coord, piece_type.Knight,black_knight, side.black);
  }
  else if(coord.y === 2 || coord.y === 5){
    return coord.x === 7?  create_piece(coord,piece_type.Bishop,white_bishop, side.white) : create_piece(coord,piece_type.Bishop,black_bishop, side.black);
  }
  else if(coord.y === 3 ){
    return  coord.x === 7 ? create_piece(coord, piece_type.Queen,white_queen, side.white) : create_piece(coord, piece_type.Queen,black_queen, side.black) ;
  }
  else{
    return  coord.x === 7 ? create_piece(coord, piece_type.King,white_king, side.white) : create_piece(coord, piece_type.King,black_king, side.black) ;
  }


};



const generateGrid = () => {
    const grid :boardSquareProps [][]= [];
    for (let i = 0; i < 8; i++) {
        grid.push([])
        for (let j = 0; j < 8; j++) {
          const coord = {x: i, y: j} as coordinate;
          if (i < 2 || i > 5){
              if(i === 1 || i === 7){
                grid[i].push({occupied: true, color: side.black, pieceType: render_piece(coord)} as boardSquareProps);
              }
              else{
                //how do I do this I want to 
                grid[i].push({occupied: true, color: side.black, pieceType: render_piece(coord)} as boardSquareProps);
              }
          }
          else{
            grid[i].push({occupied: false, color: side.black } as boardSquareProps);
          }
        }
    }
    return grid;
};




function App() {
  //this board gets updated for every piece moving 
  const [board,setBoardState] = useState(generateGrid());
  const [isDropped, setIsDropped] = useState(false);
  const [parent, setParent] = useState<string | null>(null);
  return (
    <div className="App">
      <header className="App-header">

        <DndProvider backend={HTML5Backend}>
        <Chessboard board={board} setBoardState={setBoardState}/>
        </DndProvider>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

    </div>
  );
}

export default App;
