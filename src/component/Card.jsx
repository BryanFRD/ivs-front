import React from 'react';

const Card = ({children, className}) => {
  return (
    <div className={`${className} rounded-md w-72 bg-zinc-800 border border-zinc-900 p-3 overflow-hidden flex flex-col gap-3`}>
      {children}
    </div>
  );
};

export default Card;