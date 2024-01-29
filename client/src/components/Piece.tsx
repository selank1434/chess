import { useDrag } from 'react-dnd';
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


const Piece: React.FC<piece> = (props) => {

    const [{ isDragging }, drag] = useDrag({
        type: 'IMAGE',
        item:  props ,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    },[props]);
    
    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
            }}
        >
            <img src={props.src} alt="Draggable Image" style={{ ...overlayStyle }} />
        </div>
    );
}

export default Piece;

