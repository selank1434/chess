import React from 'react';

const clicker = () => {
    alert("hello");
}

export const Toggle = () => {
  return (
    <button onClick={clicker}>
        Player vs Player
    </button>
  );
};

export default Toggle;
