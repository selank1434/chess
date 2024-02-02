import React from 'react';
import { boardSquareProps, coordinate, piece, piece_type, side } from "../types";
import { useDrop } from 'react-dnd';
import black_tile from '../brown_square.jpeg'
import white_tile from '../tan_square.jpeg';
import { referee } from './Referee';




//Coord is the coordinate of our tile 
const Tile: React.FC<{
    board: boardSquareProps[][];
    coord: coordinate;
    setBoardState: React.Dispatch<React.SetStateAction<boardSquareProps[][]>>;
}> = ({ board, coord, setBoardState }) => {

    //
    const [{ isOver }, drop] = useDrop({
        accept: 'IMAGE',
        drop(item, monitor) {
            const dragSource : piece = monitor.getItem();
            console.log(dragSource);

            updateOurBoard(coord,setBoardState,dragSource);
        
          },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    //we need to know two things where our piece is moving from and where it is
    const updateOurBoard = ( coord: coordinate, setBoardState: React.Dispatch<React.SetStateAction<boardSquareProps[][]>>, dragSource: piece) => {
        setBoardState(prevGrid => {
            const res = referee(dragSource.curr,coord,prevGrid);
            if(res === false){
                console.log("ref is saying no");
                return prevGrid;
            }
            //In our previous grid we have 


            const newGrid = [...prevGrid]; // Copy the outer array
            //where piece is orignally located
            const old_x = dragSource.curr.x;
            const old_y = dragSource.curr.y;
            // where  piece wants t fo 
            const new_x = coord.x;
            const new_y = coord.y;



            console.log("new location x: ", new_x, " y: ",new_y );
            console.log("old location x: ", old_x, " y: ",old_y );
            newGrid[new_x] = [...prevGrid[new_x]]; // Copy inner array
            const new_piece = {...dragSource, curr: coord};

            newGrid[new_x][new_y].pieceType = new_piece;
            newGrid[new_x][new_y].occupied  = true;
            newGrid[old_x][old_y].occupied = false;
            newGrid[old_x][old_y].pieceType = undefined;
            console.log()
            return newGrid;
          });
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
