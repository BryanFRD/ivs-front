import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import LoadingSpinner from '../component/svg/LoadingSpinner';
import BuildingCard from '../component/card/BuildingCard';
import BuildingModal from '../component/modal/BuildingModal';
import ReactPaginate from 'react-paginate';

const OrganizationScreen = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [organization, setOrganization] = useState();
  const [buildings, setBuildings] = useState();
  const [modal, setModal] = useState();
  const {search} = useOutletContext();
  const [offset, setOffset] = useState(0);
  
  const fetchOrganization = () => {
    axios.get(`https://localhost:8000/organization/${id}`)
      .then(({data}) => setOrganization(data))
      .catch(() => navigate('/'));
  }
  
  const fetchBuildings = () => {
    axios.get(`https://localhost:8000/organization/${id}/buildings`, {params: {search, offset, limit: 15}})
      .then(({data}) => {setBuildings(data)})
      .catch(console.log);
  }
  
  const fetchCallback = () => {
    fetchOrganization();
    fetchBuildings();
  }
  
  const handleOpenModal = (organization) => {
    if(organization)
      setModal(organization);
  }
  
  useEffect(() => {
    fetchOrganization();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  
  useEffect(() => {
    fetchBuildings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, search, offset]);
  
  return (
    <div className='flex flex-col gap-5 p-5 h-full max-h-full bg-zinc-700'>
      {organization ?
        <>
          <div className='flex flex-col gap-3'>
            <div className='flex flex-col items-center gap-10 text-xl'>
              <h1 className='text-3xl'>Organisation: {organization.name}</h1>
              <span>Personnes: {organization.peoples}</span>
            </div>
          </div>
          <div className='flex flex-col gap-5 justify-between overflow-auto'>
            {buildings &&
              <>
                <div className='flex flex-wrap gap-10'>
                  {buildings.datas?.map(building => <BuildingCard key={building.id} {...{building, handleOpenModal}} fetchCallback={fetchCallback}/>)}
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