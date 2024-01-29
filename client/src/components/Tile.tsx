import React from 'react';
import { boardSquareProps, coordinate, piece, piece_type, side } from "../types";
import { useDrop } from 'react-dnd';
import black_tile from '../brown_square.jpeg'
import white_tile from '../tan_square.jpeg';


const Tile: React.FC<{
    board: boardSquareProps[][];
    coord: coordinate;
    setBoardState: React.Dispatch<React.SetStateAction<boardSquareProps[][]>>;
}> = ({ board, coord, setBoardState }) => {

    //
    const [{ isOver }, drop] = useDrop({
        accept: 'IMAGE',
        drop(item, monitor) {
            // Access the drag source information
            const dragSource : piece = monitor.getItem();
            updateOurBoard(board,coord,setBoardState,dragSource);
            
            // Handle the drop logic here
          },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const updateOurBoard = (board: boardSquareProps[][], coord: coordinate, setBoardState: React.Dispatch<React.SetStateAction<boardSquareProps[][]>>, dragSource: piece) => {

        const newGrid = [...board];



        const updatedPiece: piece = {
            ...dragSource, 
            curr: {x: coord.x, y: coord.y}
        };


        const newValue = { occupied: true, color: side.black, pieceType: updatedPiece } as boardSquareProps;
        newGrid[coord.x][coord.y] = newValue;
        
        //I also want to get the logic in order to get rid of the old one how do I know where a piece is ocming from 
        // console.log(dragSource);
        newGrid[dragSource.curr.x][dragSource.curr.y].pieceType = undefined;

        // console.log(newGrid);
        // // Update the state with the new grid
        setBoardState(newGrid);
    }

    return (
        <div
            ref={drop}
            style={{
                width: '50px',
                height: '50px',
                position: 'relative',
            }}
        >
            {isOver && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 255, 0, 0.2)',
                    }}
                ></div>
            )}
            {(coord.x+coord.y) %2 ? (
            <img src={black_tile} alt="Image 1" style={{ width: '100%', height: '100%' }} />
        ) : (
            <img src={white_tile} alt="Image 2" style={{ width: '100%', height: '100%' }} />
        )}

        </div>
    );
}

export default Tile;
