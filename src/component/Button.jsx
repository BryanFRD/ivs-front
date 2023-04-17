import React from 'react';

const Button = ({type ,className, onClick, children}) => {
  return (
    <button {...{onClick, type}} className={`${className} rounded-md px-3 py-1 border-2 focus-visible:outline-none transition-colors`}>
      {children}
    </button>
  );
};

export default Button;