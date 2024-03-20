import React from 'react';

const clicker = (setPVP: React.Dispatch<React.SetStateAction<boolean>>) => {
  return () => {
    setPVP(true);
  };
};

type ToggleProps = {
  setPVP: React.Dispatch<React.SetStateAction<boolean>>;
};

const Toggle: React.FC<ToggleProps> = ({ setPVP }) => {
  return (
    <button onClick={clicker(setPVP)}>
      Player vs Player
    </button>
  );
};

export default Toggle;
