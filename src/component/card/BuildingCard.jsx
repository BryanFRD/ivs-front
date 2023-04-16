import React from 'react';
import Card from '../Card';
import { Link } from 'react-router-dom';
import Button from '../Button';
import axios from 'axios';

const BuildingCard = ({building, handleOpenModal, fetchCallback}) => {
  const handleUpdate = async (building) => {
    return await axios.put(`https://localhost:8000/building/${building.id}`, building)
      .then(() => true)
      .catch(() => false)
      .finally(fetchCallback);
  }
  
  const handleDelete = async () => {
    return await axios.delete(`https://localhost:8000/building/${building.id}`)
      .then(() => true)
      .catch(() => false)
      .finally(fetchCallback);
  }
  
  return (
    <Card>
      <Link to={`/building/${building.id}`} className='underline underline-offset-2 hover:text-zinc-300'>{building.name}</Link>
      <span>Zipcode: {building.zipcode}</span>
      <span>Organization: {building?.organization?.name ?? 'Aucune'}</span>
      <div className='flex gap-5 justify-end'>
        <Button className='bg-blue-700 border-none hover:bg-blue-900' onClick={() => handleOpenModal({type: 'UPDATE', submit: handleUpdate, building})}>Modifier</Button>
        <Button className='bg-red-700 border-none hover:bg-red-900' onClick={() => handleDelete()}>Supprimer</Button>
      </div>
    </Card>
  );
};

export default BuildingCard;