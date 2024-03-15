import React from 'react';
import { boardSquareProps, coordinate, piece, piece_type, side } from "../types";
import { useDrop } from 'react-dnd';
import black_tile from '../brown_square.jpeg'
import white_tile from '../tan_square.jpeg';
import { referee } from './Referee';
import { getAImove } from '../Translation/SendToServer';
import { render_piece } from '../App';
import { Console } from 'console';
import { check_mate_board } from '../moves/Checkmate';
import { inCheck } from '../rules/InCheck';
import { bishop_check } from '../check/BishopCheck';

// Usage example:

//Coord is the coordinate of our tile 
const Tile: React.FC<{
    board: boardSquareProps[][];
    coord: coordinate;
    setBoardState: React.Dispatch<React.SetStateAction<boardSquareProps[][]>>;
    setBlackMove: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ board, coord, setBoardState, setBlackMove }) => {

    //This function is checking to see if I can 
    const [{ isOver }, drop] = useDrop({
        accept: 'IMAGE',
        drop(item, monitor) {
            //I am checking to see if the 
            const dragSource : piece = monitor.getItem();
            console.log("I am draggin near tile x: ", coord.x, " y: ",coord.y);
            const old_board = board;
            updateOurBoard(coord,setBoardState,dragSource)
            setBlackMove(true);
            },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const find_white_king = (board: boardSquareProps[][]): coordinate => {
        board.forEach((row,x) => row.forEach((col,y) => {
            if(col.pieceType?.piece === piece_type.King && col.pieceType.color === side.white){
                const coord: coordinate = {x: x, y: y};
                return coord;
            }

        }))
        return {x:7, y: 4};
    }

    //This function changes based on the 
    const updateOurBoard = ( coord: coordinate, setBoardState: React.Dispatch<React.SetStateAction<boardSquareProps[][]>>, dragSource: piece) : void | boolean => {
        setBoardState(prevGrid => {
            //if I want to go to the 
            const newGrid = [...prevGrid]; // Copy the outer array
            //where piece is orignally located
            const old_x = dragSource.curr.x;
            const old_y = dragSource.curr.y;
            // where  piece wants t fo 
            const new_x = coord.x;
            const new_y = coord.y;
            console.log("I think the piece has started at x: ", old_x, " y: ", old_y);
            console.log("I think that the piece is going to end up at: ", new_x, " y: ", new_y);

            
            newGrid[new_x] = [...prevGrid[new_x]]; // Copy inner array
            const temp = dragSource;
            console.log("drag source info " ,temp);
            const new_piece = {...temp, curr: coord};
            console.log("New piece is this" ,new_piece);
            newGrid[new_x][new_y] = { pieceType: new_piece, occupied: true} as boardSquareProps;
            console.log("my newGrid new_x is this ",  newGrid[new_x][new_y] )

            newGrid[old_x][old_y].occupied = false;
            newGrid[old_x][old_y].pieceType = undefined;
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






export const generate_coordinates = (stockfish_res: String, setBoardState: React.Dispatch<React.SetStateAction<boardSquareProps[][]>> ) => {;
    // bestmove e7e5 ponder a2a3
    console.log("res",stockfish_res);
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
