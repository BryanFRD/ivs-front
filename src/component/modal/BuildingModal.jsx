import React, { useState } from 'react';
import Modal from '../Modal';
import Input from '../Input';
import Button from '../Button';
import AsyncSelect from 'react-select/async';
import axios from 'axios';

const BuildingModal = ({modal, setModal}) => {
  const [error, setError] = useState(false);
  
  const promiseOptions = (value) => {
    return axios.get('https://localhost:8000/organization', {params: {search: value, limit: 20}})
      .then(({data}) => data?.datas?.map(({id, name}) => ({value: id, label: name})));
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);
    
    const building = Object.fromEntries(new FormData(event.currentTarget));
    building.id = modal?.building?.id;
    console.log('building:', building);
    
    const succeed = await modal?.submit(building);
    setError(!succeed)
    
    if(succeed)
      setModal(false);
  }
  
  return (
    <Modal open={Boolean(modal)} setOpen={setModal}>
      <div className='bg-zinc-900 text-zinc-200 p-5 rounded-md flex flex-col gap-5 text-center'>
        <h2 className='text-xl'>{modal?.type === 'CREATE' ? 'Création' : 'Mise à jour'} d'un bâtiment</h2>
        {error && 
          <span className='text-red-500'>Erreur lors de l'envoie des données !</span>
        }
        <form onSubmit={handleSubmit} className='flex flex-col gap-10'>
          <div className='flex gap-3 justify-between items-center'>
            <label className='text-lg'>Nom: </label>
            <Input name='name' placeholder='nom' defaultValue={modal?.building?.name ?? ''} className='w-48'/>
          </div>
          <div className='flex gap-3 justify-between items-center'>
            <label className='text-lg'>Zipcode: </label>
            <Input name='zipcode' placeholder='zipcode' type='number' defaultValue={modal?.building?.zipcode ?? ''} className='w-48'/>
          </div>
          <div className='flex gap-3 justify-between items-center'>
            <label className='text-lg'>Organization: </label>
            <AsyncSelect
              name='organization_id'
              placeholder='Organization'
              className='w-48 text-left'
              classNames={{
                control: () => 'bg-zinc-700',
                input: () => 'text-zinc-100',
                singleValue: () => 'text-zinc-400',
                menu: () => 'bg-zinc-700 text-zinc-200',
                option: ({isFocused, isSelected}) => (isFocused || isSelected) && 'bg-zinc-600'
              }}
              defaultValue={{value: modal?.building?.organization_id, label: modal?.building?.organization_name}}
              isClearable
              defaultOptions
              loadOptions={promiseOptions}
            />
          </div>
          <div className='flex gap-5 justify-end'>
            <Button type="button" className='bg-red-700 border-none hover:bg-red-900' onClick={() => setModal(false)}>Annuler</Button>
            <Button type="submit" className='bg-green-700 border-none hover:bg-green-900'>{modal?.type === 'CREATE' ? 'Créer' : 'Valider'}</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default BuildingModal;