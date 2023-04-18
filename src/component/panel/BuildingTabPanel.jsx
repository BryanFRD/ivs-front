import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import Button from '../Button';
import BuildingModal from '../modal/BuildingModal';
import BuildingCard from '../card/BuildingCard';
import ReactPaginate from 'react-paginate';

const BuildingTabPanel = ({datas: {buildings}, setDatas}) => {
  const {search} = useOutletContext();
  const [modal, setModal] = useState();
  const [offset, setOffset] = useState(0);
  
  const fetchBuildings = () => {
    axios.get('https://localhost:8000/building', {params: {offset, search, limit: 15}})
      .then(response => setDatas(prevValue => ({...prevValue, buildings: response?.data})))
  }
  
  useEffect(() => {    
    fetchBuildings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buildings, offset, search]);
  
  const handleOpenModal = (building) => {
    setModal(building ?? {});
  }
  
  const handleCreate = async (building) => {
    return await axios.post('https://localhost:8000/building', building)
      .then(() => true)
      .catch(() => false)
      .finally(fetchBuildings);
  }
  
  return (
    <Tab.Panel className='flex flex-col h-full max-h-full'>
      <div className='flex justify-end mb-5'>
        <Button className='bg-green-700 border-none hover:bg-green-900' onClick={() => handleOpenModal({type: 'CREATE', submit: handleCreate})}>Créer</Button>
      </div>
      <div className='flex flex-col gap-5 justify-between h-full max-h-full overflow-auto'>
        {buildings &&
          <>
            <div className='flex flex-wrap gap-10'>
              {buildings.datas?.map(building => <BuildingCard key={building.id} {...{building, handleOpenModal}} fetchCallback={fetchBuildings}/>)}
            </div>
            {(buildings.count / 15) > 1 &&
              <ReactPaginate
                breakLabel='...' 
                nextLabel='suivant >'
                onPageChange={(event) => setOffset(event.selected * 15)}
                pageCount={buildings.count / 15}
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
      <BuildingModal {...{modal, setModal}}/>
    </Tab.Panel>
  );
};

export default BuildingTabPanel;