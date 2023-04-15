import { Tab } from '@headlessui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import Button from '../Button';
import Card from '../Card';
import RoomModal from '../modal/RoomModal';
import RoomCard from '../card/RoomCard';

const RoomTabPanel = ({limit, offset}) => {
  const [rooms, setRooms] = useState();
  const {search} = useOutletContext();
  const [modal, setModal] = useState();
  
  const fetchRooms = () => {
    axios.get('https://localhost:8000/room', {params: {limit, offset, search}})
      .then(response => setRooms(response?.data))
      .catch(console.log);
  }
  
  useEffect(() => {
    fetchRooms();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, offset, search]);
  
  const handleOpenModal = (room) => {
    setModal(room ?? {})
  }
  
  const handleCreate = async (room) => {
    return await axios.post('https://localhost:8000/room', room)
      .then(() => true)
      .catch(() => false)
      .finally(fetchRooms);
  }
  
  return (
    <Tab.Panel className='flex flex-col'>
      <div className='flex justify-end'>
        <Button className='bg-green-700 border-none hover:bg-green-900' onClick={() => handleOpenModal({type: 'CREATE', submit: handleCreate})}>Créer</Button>
      </div>
      <div className='flex flex-wrap gap-10'>
        {rooms?.map(room => <RoomCard key={room.id} {...{room, handleOpenModal}} fetchCallback={fetchRooms}/>)}
      </div>
      <RoomModal {...{modal, setModal}}/>
    </Tab.Panel>
  );
};

export default RoomTabPanel;