import { useDrag } from 'react-dnd';
import black_pawn from '../static_elements/tester.jpeg';
import { useMemo, useState } from 'react';
import { boardSquareProps, coordinate, piece } from '../types';
import { useDraggable } from '@dnd-kit/core';

const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '20px', // Adjust width and height according to your needs
    height: '20px',
};

interface PieceProps {
    board: boardSquareProps[][];
    coord: coordinate;
    setBoardState: React.Dispatch<React.SetStateAction<boardSquareProps[][]>>;
}

const Piece: React.FC<PieceProps> = (props) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'IMAGE',
        item: { imageSrc: black_pawn },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    },[props]);
    console.log(drag);
    
    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
            }}
        >
            <img src={black_pawn} alt="Draggable Image" style={{ ...overlayStyle }} />
        </div>
    );
}

export default Piece;



// import { useDrag } from 'react-dnd'
// import black_pawn from '../static_elements/tester.jpeg';
// import { useMemo, useState } from 'react';
// import { boardSquareProps, coordinate, piece } from '../types';
// import { useDraggable } from '@dnd-kit/core';
// const overlayStyle: React.CSSProperties = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: '20px', // Adjust width and height according to your needs
//     height: '20px',
//   };

// export interface piece_location{
//   x: number,
//   y: number
// }


// //piece should only get 
// const Piece = () => {
//   // //I am just going to make it a 1d array tbh why 2d If i do not need it  
//   const [{ isDragging }, drag] = useDrag({
//     type: 'IMAGE',
//     item: { imageSrc: black_pawn },
//     collect: (monitor) => ({
//       isDragging: !!monitor.isDragging(),
//     }),
//   });

//   return (
//     <div
//       ref={drag}
//       style={{
//         opacity: isDragging ? 0.5 : 1,
//         cursor: 'move',
//       }}
//     >
//       <img src={black_pawn} alt="Draggable Image"  style={{ ...overlayStyle}}/>
//     </div>
//   );
  
// }
// export default Piece;