import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../component/svg/LoadingSpinner';
import BuildingCard from '../component/card/BuildingCard';
import BuildingModal from '../component/modal/BuildingModal';

const OrganizationScreen = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [organization, setOrganization] = useState();
  const [buildings, setBuildings] = useState();
  const [modal, setModal] = useState();
  
  const fetchOrganization = () => {
    axios.get(`https://localhost:8000/organization/${id}`)
      .then(({data}) => setOrganization(data))
      .catch(() => navigate('/'));
  }
  
  const fetchBuildings = () => {
    axios.get(`https://localhost:8000/organization/${id}/buildings`)
      .then(({data}) => setBuildings(data))
      .catch(console.log);
  }
  
  const handleOpenModal = (organization) => {
    if(organization)
      setModal(organization);
  }
  
  useEffect(() => {
    fetchOrganization();
    fetchBuildings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  
  return (
    <div className='flex flex-col gap-5 p-5 h-full bg-zinc-700'>
      {organization ?
        <>
          <div className='flex flex-col gap-3'>
            <div className='flex flex-col items-center gap-10 text-xl'>
              <h1 className='text-3xl'>Organisation: {organization.name}</h1>
            </div>
          </div>
          <div className='flex flex-wrap gap-10 max-h-full overflow-auto'>
            {buildings?.map(building => <BuildingCard key={building.id} {...{building, handleOpenModal}} fetchCallback={fetchBuildings}/>)}
          </div>
          <BuildingModal {...{modal, setModal}}/>
        </>
        :
        <div className='flex justify-center items-center gap-10'>
          <div className='status'><LoadingSpinner /></div>
        </div>
      }
    </div>
  );
};

export default OrganizationScreen;