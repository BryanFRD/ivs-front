import React from 'react';

const Button = ({className, onClick, children}) => {
  return (
    <button {...{onClick}} className={`${className} rounded-md px-3 py-1 border-2 focus-visible:outline-none transition-colors`}>
      {children}
    </button>
  );
};

export default Button;