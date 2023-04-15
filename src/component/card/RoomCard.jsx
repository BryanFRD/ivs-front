import React from 'react';
import Card from '../Card';
import { Link } from 'react-router-dom';
import Button from '../Button';
import axios from 'axios';

const RoomCard = ({room, handleOpenModal, fetchCallback}) => {
  const handleUpdate = async (room) => {
    return await axios.put(`https://localhost:8000/room/${room.id}`, room)
      .then(() => true)
      .catch(() => false)
      .finally(fetchCallback);
  }
  
  const handleDelete = async () => {
    return await axios.delete(`https://localhost:8000/room/${room.id}`)
      .then(() => true)
      .catch(() => false)
      .finally(fetchCallback);
  }
  return (
    <Card>
      <Link to={`/room/${room.id}`} className='underline underline-offset-2 hover:text-zinc-300'>{room.name}</Link>
      <div className='flex gap-5 justify-end'>
        <Button className='bg-blue-700 border-none hover:bg-blue-900' onClick={() => handleOpenModal({type: 'UPDATE', submit: handleUpdate, room})}>Modifier</Button>
        <Button className='bg-red-700 border-none hover:bg-red-900' onClick={() => handleDelete()}>Supprimer</Button>
      </div>
    </Card>
  );
};

export default RoomCard;