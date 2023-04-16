import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import Card from '../Card';
import { Tab } from '@headlessui/react';
import Button from '../Button';
import OrganizationModal from '../modal/OrganizationModal';
import OrganizationCard from '../card/OrganizationCard';

const OrganizationTabPanel = ({limit, offset}) => {
  const [organizations, setOrganizations] = useState();
  const {search} = useOutletContext();
  const [modal, setModal] = useState();
  
  const fetchOrganizations = () => {
    axios.get('https://localhost:8000/organization', {params: {limit, offset, search}})
      .then(response => setOrganizations(response?.data))
      .catch(console.log);
  }
  
  useEffect(() => {
    fetchOrganizations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, offset, search]);
  
  const handleOpenModal = (organization) => {
    setModal(organization ?? {});
  }
  
  const handleCreate = async (organization) => {
    return await axios.post('https://localhost:8000/organization', organization)
      .then(() => true)
      .catch(() => false)
      .finally(fetchOrganizations);
  }
  
  return (
    <Tab.Panel className='flex flex-col max-h-full'>
      <div className='flex justify-end mb-5'>
        <Button className='bg-green-700 border-none hover:bg-green-900' onClick={() => handleOpenModal({type: 'CREATE', submit: handleCreate})}>Créer</Button>
      </div>
      <div className='flex flex-wrap gap-10 max-h-full overflow-auto'>
        {organizations?.map(organization => <OrganizationCard key={organization.id} {...{organization, handleOpenModal}} fetchCallback={fetchOrganizations}/>)}
      </div>
      <OrganizationModal {...{modal, setModal}}/>
    </Tab.Panel>
  );
};

export default OrganizationTabPanel;