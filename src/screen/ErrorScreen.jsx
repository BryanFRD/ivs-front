import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../component/Button';

const ErrorScreen = () => {
  const navigate = useNavigate();
  
  const handleNavigateHome = () => {
    navigate('/');
  }
  
  return (
    <div className='flex flex-col justify-center items-center gap-3 h-full'>
      <h1 className='text-5xl text-red-600'>Erreur 404</h1>
      <span className='text-zinc-400'>Page non trouvée</span>
      <Button onClick={handleNavigateHome} className='border-none bg-red-700 hover:bg-red-600 mt-10'>Revenir à la page d'accueil</Button>
    </div>
  );
};

export default ErrorScreen;