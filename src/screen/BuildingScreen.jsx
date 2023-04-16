import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../component/svg/LoadingSpinner';
import RoomCard from '../component/card/RoomCard';
import RoomModal from '../component/modal/RoomModal';

const BuildingScreen = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [building, setBuildings] = useState();
  const [rooms, setRooms] = useState();
  const [modal, setModal] = useState();
  
  const fetchBuilding = () => {
    axios.get(`https://localhost:8000/building/${id}`)
      .then(({data}) => setBuildings(data))
      .catch(() => navigate('/'));
  }
  
  const fetchRooms = () => {
    axios.get(`https://localhost:8000/building/${id}/rooms`)
      .then(({data}) => setRooms(data))
      .catch(console.log);
  }
  
  const handleOpenModal = (building) => {
    if(building)
      setModal(building);
  }
  
  useEffect(() => {
    fetchBuilding();
    fetchRooms();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  
  return (
    <div className='flex flex-col gap-5 p-5 h-full bg-zinc-700'>
      {building ?
        <>
          <div className='flex flex-col gap-3'>
            <div className='flex flex-col items-center gap-10 text-xl'>
              <h1 className='text-3xl'>Bâtiment: {building.name}</h1>
              <h2>Zipcode: {building.zipcode}</h2>
              <div>
                <span>Organisation: </span>
                <Link 
                  to={building.organization?.id ? `/organization/${building.organization.id}` : ''}
                  className={building.organization?.id ? 'underline underline-offset-2 hover:text-zinc-300' : 'pointer-events-none'}>
                    {building.organization?.name ?? 'Aucune'}
                </Link>
              </div>
            </div>
          </div>
          <div className='flex flex-wrap gap-10 max-h-full overflow-auto'>
            {rooms?.map(room => <RoomCard key={room.id} {...{room, handleOpenModal}} fetchCallback={fetchRooms}/>)}
          </div>
          <RoomModal {...{modal, setModal}}/>
        </>
        :
        <div className='flex justify-center items-center gap-10'>
          <div className='status'><LoadingSpinner /></div>
        </div>
      }
    </div>
  );
};

export default BuildingScreen;