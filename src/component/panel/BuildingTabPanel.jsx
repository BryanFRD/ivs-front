import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import Button from '../Button';
import BuildingModal from '../modal/BuildingModal';
import BuildingCard from '../card/BuildingCard';

const BuildingTabPanel = ({limit, offset}) => {
  const [buildings, setBuildings] = useState();
  const {search} = useOutletContext();
  const [modal, setModal] = useState();
  
  const fetchBuildings = () => {
    axios.get('https://localhost:8000/building', {params: {limit, offset, search}})
      .then(response => setBuildings(response?.data))
      .catch(console.log);
  }
  
  useEffect(() => {
    fetchBuildings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, offset, search]);
  
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
    <Tab.Panel className='flex flex-col max-h-full'>
      <div className='flex justify-end mb-5'>
        <Button className='bg-green-700 border-none hover:bg-green-900' onClick={() => handleOpenModal({type: 'CREATE', submit: handleCreate})}>Créer</Button>
      </div>
      <div className='flex flex-wrap gap-10 max-h-full overflow-auto'>
        {buildings?.map(building => <BuildingCard key={building.id} {...{building, handleOpenModal}} fetchCallback={fetchBuildings}/>)}
      </div>
      <BuildingModal {...{modal, setModal}}/>
    </Tab.Panel>
  );
};

export default BuildingTabPanel;