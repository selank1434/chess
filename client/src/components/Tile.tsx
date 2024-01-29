import React from 'react';
import { boardSquareProps, coordinate, piece, piece_type, side } from "../types";
import { useDrop } from 'react-dnd';
import imgSrc from '../static_elements/black-square.jpg';



const Tile: React.FC<{
    board: boardSquareProps[][];
    coord: coordinate;
    setBoardState: React.Dispatch<React.SetStateAction<boardSquareProps[][]>>;
}> = ({ board, coord, setBoardState }) => {

    const [{ isOver }, drop] = useDrop({
        accept: 'IMAGE',
        drop: () => updateOurBoard(board, coord, setBoardState),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const updateOurBoard = (board: boardSquareProps[][], coord: coordinate, setBoardState: React.Dispatch<React.SetStateAction<boardSquareProps[][]>>) => {
        const newGrid = [...board];
        const piec = { color: side.black, piece: piece_type.Pawn, start: coord, curr: coord } as piece;
        const newValue = { occupied: true, color: side.black, pieceType: piec } as boardSquareProps;
        newGrid[coord.x][coord.y] = newValue;
        //I also want to get the logic in order to get rid of the old one how do I know where a piece is ocming from 
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
            <img src={imgSrc} alt="Target Image" style={{ width: '100%', height: '100%' }} />

        </div>
    );
}

export default Tile;
