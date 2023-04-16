import React from 'react';
import LoadingSpinner from '../component/svg/LoadingSpinner';

const LoadingScreen = () => {
  return (
    <div className='flex justify-center items-center h-full'>
      <div className='status'>
        <LoadingSpinner />
      </div>
    </div>
  );
};

export default LoadingScreen;