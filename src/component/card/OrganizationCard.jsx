import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../Card';
import Button from '../Button';

const OrganizationCard = ({organization, handleOpenModal, fetchCallback}) => {
  const handleUpdate = async (organization) => {
    return await axios.put(`https://localhost:8000/organization/${organization.id}`, organization)
      .then(() => true)
      .catch(() => false)
      .finally(fetchCallback);
  }
  
  const handleDelete = async () => {
    return await axios.delete(`https://localhost:8000/organization/${organization.id}`)
      .then(() => true)
      .catch(() => false)
      .finally(fetchCallback);
  }
  
  return (
    <Card>
      <Link to={`/organization/${organization.id}`} className='underline underline-offset-2 hover:text-zinc-300'>{organization.name}</Link>
      <div className='flex gap-5 justify-end'>
        <Button className='bg-blue-700 border-none hover:bg-blue-900' onClick={() => handleOpenModal({type: 'UPDATE', submit: handleUpdate, organization})}>Modifier</Button>
        <Button className='bg-red-700 border-none hover:bg-red-900' onClick={() => handleDelete()}>Supprimer</Button>
      </div>
    </Card>
  );
};

export default OrganizationCard;