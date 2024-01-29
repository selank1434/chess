import React, { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import white from "../static_elements/white_square.png";


import './App.css';

import { boardSquareProps, coordinate, piece, piece_type, side } from './types';
import Chessboard from './components/Chessboard';
import Piece from './components/Piece';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'



export const create_pawn = (coord :coordinate) => {
  //This makes all our pawns 
    const pawn = {color: side.black, piece: piece_type.Pawn, start: coord, curr: coord} as piece;
    return {occupied: true, pieceType: pawn, color: side.black} as boardSquareProps;
   
}
const create_piece = (coord:coordinate, type: piece_type) => {
  const queen = {color: side.black, piece: piece_type.Pawn, start: coord, curr: coord} as piece;
  return {color: coord.x === 0 ? side.black : side.white, curr: coord, start:coord, occupied: true, pieceType: queen} as boardSquareProps;
}

const create_empty = (coord: coordinate) => {
    return (coord.x+coord.y) %2 ? {color: side.black ,occupied: false} as boardSquareProps : {color: side.white ,occupied: false} as boardSquareProps;
}


//start with the 
const generateGrid = () => {
    const grid :boardSquareProps [][]= [];
    for (let i = 0; i < 8; i++) {
        grid.push([])
        for (let j = 0; j < 8; j++) {
          const coord = {x: i, y: j} as coordinate;
          if (i < 2 || i > 5){
              if(i === 1 || i === 7){
                grid[i].push(create_pawn(coord));
              }
              else{
                //how do I do this I want to 
                grid[i].push(create_pawn(coord));
              }
          }
          else{
            grid[i].push(create_empty(coord));
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


  // return (
  //   <DndContext onDragEnd={handleDragEnd}>
  //     {!parent ? draggable : null}
  //     <Droppable id="droppable">
  //       {parent === "droppable" ? draggable : 'Drop here'}
  //     </Droppable>
  //   </DndContext>
  // );

  function handleDragEnd(event: DragEndEvent) {
    const overId = event.over?.id;
    setParent((overId as string) || null);
   // Explicitly using null here to satisfy the type
  }
  const handleDrop = () => {
    console.log('Image dropped!');
    // Handle the dropped image as needed
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* <DragComponent col={0} row={0}/>
        <DropComponent col = {0} row={0}/> */}
        <DndProvider backend={HTML5Backend}>
        {/* <ImageComponent/>
        <TargetComponent/> */}
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
