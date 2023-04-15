import React, { useState } from 'react';
import Modal from '../Modal';
import Input from '../Input';
import AsyncSelect from 'react-select/async';
import Button from '../Button';
import axios from 'axios';

const RoomModal = ({modal, setModal}) => {
  const [error, setError] = useState(false);
  
  const promiseOptions = (value) => {
    return axios.get('https://localhost:8000/building', {params: {search: value}})
      .then(response => response?.data?.map(({id, name}) => ({value: id, label: name})));
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);
    
    const room = Object.fromEntries(new FormData(event.currentTarget));
    room.id = modal?.room?.id;
    
    const succeed = await modal?.submit(room);
    setError(!succeed)
    
    if(succeed)
      setModal(false);
  }
  
  return (
    <Modal open={Boolean(modal)} setOpen={setModal}>
      <div className='bg-zinc-900 text-zinc-200 p-5 rounded-md flex flex-col gap-5 text-center'>
        <h2 className='text-xl'>{modal?.type === 'CREATE' ? 'Création' : 'Mise à jour'} d'une pièce</h2>
        {error && 
          <span className='text-red-500'>Erreur lors de l'envoie des données !</span>
        }
        <form onSubmit={handleSubmit} className='flex flex-col gap-10'>
          <div className='flex gap-3 justify-between items-center'>
            <label className='text-lg'>Nom: </label>
            <Input name='name' placeholder='nom' defaultValue={modal?.room?.name ?? ''} className='w-48'/>
          </div>
          <div className='flex gap-3 justify-between items-center'>
            <label className='text-lg'>Personnes: </label>
            <Input name='peoples' placeholder='peoples' type='number' defaultValue={modal?.room?.peoples ?? 0} className='w-48'/>
          </div>
          <div className='flex gap-3 justify-between items-center'>
            <label className='text-lg'>Bâtiment: </label>
            <AsyncSelect
              name='building'
              placeholder='Bâtiement'
              className='w-48 text-left'
              defaultValue={modal?.room?.building && {value: modal?.room?.building?.id, label: modal?.room?.building?.name}}
              isClearable
              defaultOptions
              loadOptions={promiseOptions}
            />
          </div>
          <div className='flex gap-5 justify-end'>
            <Button className='bg-red-700 border-none hover:bg-red-900' onClick={() => setModal(false)}>Annuler</Button>
            <Button className='bg-green-700 border-none hover:bg-green-900'>{modal?.type === 'CREATE' ? 'Créer' : 'Valider'}</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default RoomModal;