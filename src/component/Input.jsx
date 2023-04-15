import React from 'react';

const Input = (props) => {
  return (
    <input {...props ?? {}} className={`${props.className} p-1 border-b border-zinc-400 rounded-md focus-visible:outline-0 bg-zinc-700`}/>
  );
};

export default Input;