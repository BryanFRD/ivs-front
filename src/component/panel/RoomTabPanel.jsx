import { Tab } from '@headlessui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Button from '../Button';
import RoomModal from '../modal/RoomModal';
import RoomCard from '../card/RoomCard';
import ReactPaginate from 'react-paginate';

const RoomTabPanel = ({datas: {rooms}, setDatas}) => {
  const {search} = useOutletContext();
  const [modal, setModal] = useState();
  const [offset, setOffset] = useState(0);
  
  const fetchRooms = () => {
    axios.get('https://localhost:8000/room', {params: {offset, search, limit: 15}})
      .then(response => setDatas(prevValue => ({...prevValue, rooms: response?.data})))
      .catch(console.log);
  }
  
  useEffect(() => {
    fetchRooms();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rooms, offset, search]);
  
  const handleOpenModal = (room) => {
    setModal(room ?? {});
  }
  
  const handleCreate = async (room) => {
    return await axios.post('https://localhost:8000/room', room)
      .then(() => true)
      .catch(() => false)
      .finally(fetchRooms);
  }
  
  return (
    <Tab.Panel className='flex flex-col h-full max-h-full'>
      <div className='flex justify-end mb-5'>
        <Button className='bg-green-700 border-none hover:bg-green-900' onClick={() => handleOpenModal({type: 'CREATE', submit: handleCreate})}>Créer</Button>
      </div>
      <div className='flex flex-col gap-5 justify-between h-full max-h-full overflow-auto'>
        {rooms &&
          <>
            <div className='flex flex-wrap gap-10'>
              {rooms.datas?.map(room => <RoomCard key={room.id} {...{room, handleOpenModal}} fetchCallback={fetchRooms}/>)}
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
    </Tab.Panel>
  );
};

export default RoomTabPanel;