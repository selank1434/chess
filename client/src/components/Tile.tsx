import React from 'react';
import { boardSquareProps, coordinate, piece, piece_type, side } from "../types";
import { useDrop } from 'react-dnd';
import black_tile from '../brown_square.jpeg'
import white_tile from '../tan_square.jpeg';
import { referee } from './Referee';
import { getAImove } from '../Translation/SendToServer';
import { render_piece } from '../App';
import { Console } from 'console';

// Usage example:




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
            updateOurBoard(coord,setBoardState,dragSource);
            getAImove(board).then(response => {
                console.log(response);
                generate_coordinates(response,setBoardState);

            }).catch(error => {
                console.error('Error occurred:', error);
                // Handle errors if needed
            });
        
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



            
            newGrid[new_x] = [...prevGrid[new_x]]; // Copy inner array
            const temp = dragSource;
            console.log("drag source info " ,temp);
            const new_piece = {...temp, curr: coord};
            console.log(new_piece);
            newGrid[new_x][new_y] = { pieceType: new_piece, occupied: true} as boardSquareProps;

            newGrid[old_x][old_y].occupied = false;
            newGrid[old_x][old_y].pieceType = undefined;

            console.log("My old square is updated as follows x: ", old_x, " y: ", old_y, newGrid[old_x][old_y]);
            console.log("My new square is updated as follows x: ", new_x, " y: ", new_y, newGrid[new_x][new_y]);
            console.log("this is our board after we updates ", newGrid);

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


const translateChessCoordinatesToIndex = (chessCoordinates: string): [number, number]  => {
    const columnMap: { [key: string]: number } = {
        'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4, 'f': 5, 'g': 6, 'h': 7
    };

    if (chessCoordinates.length !== 2) {
        console.error("Invalid input: Chess coordinates must be in the format 'e7'");
        return [-1,-1];
    }

    const columnChar = chessCoordinates.charAt(0);
    const rowChar = chessCoordinates.charAt(1);

    if (!(columnChar in columnMap) || isNaN(Number(rowChar))) {
        console.error("Invalid input: Chess coordinates must be in the format 'e7'");
        return [-1,-1];
    }

    const column = columnMap[columnChar];
    const row = 8 - parseInt(rowChar, 10);

    return [row, column];
}



const generate_coordinates = (stockfish_res: String, setBoardState: React.Dispatch<React.SetStateAction<boardSquareProps[][]>> ) => {;
    // bestmove e7e5 ponder a2a3

    const move_string = stockfish_res.split(" ")[1];
    const startSquare: string = move_string.substring(0, 2);
    const endSquare: string = move_string.substring(2);


    const old_coords = translateChessCoordinatesToIndex(startSquare);
    const new_coords = translateChessCoordinatesToIndex(endSquare);

    setBoardState(prevGrid => {
        const old_x = old_coords[0];
        const old_y = old_coords[1];
    
        const new_x = new_coords[0];
        const new_y = new_coords[1];
    

        const newGrid = prevGrid.map(innerArray => [...innerArray]);
    

        const pieceFromOldCoords = prevGrid[old_x][old_y].pieceType;
    
        const occupied = true;
        newGrid[new_x][new_y] = { occupied, pieceType: pieceFromOldCoords };
    
        newGrid[old_x][old_y] = { occupied: false, pieceType: undefined };
    
        console.log("old spot: x: ", old_x, " y: ", old_y, prevGrid[old_x][old_y]);
        console.log("new spot: x: ", new_x, " y: ", new_y, prevGrid[new_x][new_y]);
    
        return newGrid;
    });
    
    




}




export default Tile;
