import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../component/svg/LoadingSpinner';

const RoomScreen = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState();
  
  const fetchRoom = () => {
    axios.get(`https://localhost:8000/room/${id}`)
      .then(({data}) => setRoom(data))
      .catch(() => navigate('/'));
  }
  
  useEffect(() => {
    fetchRoom();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  
  return (
    <div className='flex flex-col gap-5 p-5 h-full bg-zinc-700'>
      {room ?
        <>
          <div className='flex flex-col gap-3'>
            <div className='flex flex-col items-center gap-10 text-xl'>
              <h1 className='text-3xl'>Organisation: {room.name}</h1>
              <h2>Peoples: {room?.peoples ?? 'Aucune'}</h2>
              <div>
                <span>Bâtiement: </span>
                <Link
                  to={room.building?.id ? `/building/${room.building.id}` : ''}
                  className={room.building?.id ? 'underline underline-offset-2 hover:text-zinc-300' : 'pointer-events-none'}>
                    {room.building?.name ?? 'Aucune'}
                </Link>
              </div> 
            </div>
          </div>
        </>
        :
        <div className='flex justify-center items-center gap-10'>
          <div className='status'><LoadingSpinner /></div>
        </div>
      }
    </div>
  );
};

export default RoomScreen;