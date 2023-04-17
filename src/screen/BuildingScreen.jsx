import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import LoadingSpinner from '../component/svg/LoadingSpinner';
import RoomCard from '../component/card/RoomCard';
import RoomModal from '../component/modal/RoomModal';
import ReactPaginate from 'react-paginate';

const BuildingScreen = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [building, setBuildings] = useState();
  const [rooms, setRooms] = useState();
  const [modal, setModal] = useState();
  const {search} = useOutletContext();
  const [offset, setOffset] = useState(0);
  
  const fetchBuilding = () => {
    axios.get(`https://localhost:8000/building/${id}`)
      .then(({data}) => setBuildings(data))
      .catch(() => navigate('/'));
  }
  
  const fetchRooms = () => {
    axios.get(`https://localhost:8000/building/${id}/rooms`, {params: {search, offset, limit: 15}})
      .then(({data}) => setRooms(data))
      .catch(console.log);
  }
  
  const fetchCallback = () => {
    fetchBuilding();
    fetchRooms();
  }
  
  const handleOpenModal = (building) => {
    if(building)
      setModal(building);
  }
  
  useEffect(() => {
    fetchBuilding();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  
  useEffect(() => {
    fetchRooms();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, search, offset]);
  
  return (
    <div className='flex flex-col gap-5 p-5 h-full max-h-full bg-zinc-700'>
      {building ?
        <>
          <div className='flex flex-col gap-3'>
            <div className='flex flex-col items-center gap-10 text-xl'>
              <h1 className='text-3xl'>Bâtiment: {building.name}</h1>
              <h2>Zipcode: {building.zipcode}</h2>
              <div>
                <span>Organisation: </span>
                <Link 
                  to={building.organization_id ? `/organization/${building.organization_id}` : ''}
                  className={building.organization_id ? 'underline underline-offset-2 hover:text-zinc-300' : 'pointer-events-none'}>
                    {building.organization_name ?? 'Aucune'}
                </Link>
              </div>
              <span>Personnes: {building.peoples}</span>
            </div>
          </div>
          <div className='flex flex-col gap-5 justify-between overflow-auto'>
            {rooms &&
              <>
                <div className='flex flex-wrap gap-10'>
                  {rooms.datas?.map(room => <RoomCard key={room.id} {...{room, handleOpenModal}} fetchCallback={fetchCallback}/>)}
                </div>
                {(rooms.count / 15) > 1 &&
                <ReactPaginate
                  breakLabel='...' 
                  nextLabel='suivant >'
                  onPageChange={(event) => setOffset(event.selected * 15)}
                  pageCount={rooms.count / 15}
                  initialPage={0}
                  previousLabel='< précédent'
                  className='flex gap-2 self-center mb-2'
                  pageLinkClassName='hover:bg-zinc-600 px-3 py-1 rounded-md select-none'
                  activeLinkClassName='bg-zinc-600'
                  nextLinkClassName='hover:bg-zinc-600 px-3 py-1 rounded-md cursor-pointer select-none'
                  previousLinkClassName='hover:bg-zinc-600 px-3 py-1 rounded-md cursor-pointer select-none'/>
                }
              </>
            }
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