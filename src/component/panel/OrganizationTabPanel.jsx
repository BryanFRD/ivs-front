import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import Button from '../Button';
import OrganizationModal from '../modal/OrganizationModal';
import OrganizationCard from '../card/OrganizationCard';
import ReactPaginate from 'react-paginate';

const OrganizationTabPanel = ({datas: {organizations}, setDatas}) => {
  const {search} = useOutletContext();
  const [modal, setModal] = useState();
  const [offset, setOffset] = useState(0);
  
  const fetchOrganizations = () => {
    axios.get('https://localhost:8000/organization', {params: {offset, search, limit: 15}})
      .then(response => setDatas(prevValue => ({...prevValue, organizations: response?.data})))
      .catch(console.log);
  }
  
  useEffect(() => {
    fetchOrganizations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, search]);
  
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
    <Tab.Panel className='flex flex-col h-full max-h-full'>
      <div className='flex justify-end mb-5'>
        <Button className='bg-green-700 border-none hover:bg-green-900' onClick={() => handleOpenModal({type: 'CREATE', submit: handleCreate})}>Créer</Button>
      </div>
      <div className='flex flex-col gap-5 justify-between h-full max-h-full overflow-auto'>
        {organizations &&
          <>
            <div className='flex flex-wrap gap-10'>
              {organizations.datas?.map(organization => <OrganizationCard key={organization.id} {...{organization, handleOpenModal}} fetchCallback={fetchOrganizations}/>)}
            </div>
            {(organizations.count / 15) > 1 &&
              <ReactPaginate 
                breakLabel='...' 
                nextLabel='suivant >'
                onPageChange={(event) => setOffset(event.selected * 15)}
                pageCount={organizations.count / 15}
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
      <OrganizationModal {...{modal, setModal}}/>
    </Tab.Panel>
  );
};

export default OrganizationTabPanel;