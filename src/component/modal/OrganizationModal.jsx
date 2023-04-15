import React, { useState } from 'react';
import Modal from '../Modal';
import Input from '../Input';
import Button from '../Button';

const OrganizationModal = ({modal, setModal}) => {
  const [error, setError] = useState(false);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);
    
    const organization = Object.fromEntries(new FormData(event.currentTarget));
    organization.id = modal?.organization?.id;
    
    const succeed = await modal?.submit(organization);
    setError(!succeed)
    
    if(succeed)
      setModal(false);
  }
  
  return (
    <Modal open={Boolean(modal)} setOpen={setModal}>
      <div className='bg-zinc-900 text-zinc-200 p-5 rounded-md flex flex-col gap-5 text-center'>
        <h2 className='text-xl'>{modal?.type === 'CREATE' ? 'Création' : 'Mise à jour'} d'une organisation</h2>
        {error && 
          <span className='text-red-500'>Erreur lors de l'envoie des données !</span>
        }
        <form onSubmit={handleSubmit} className='flex flex-col gap-10'>
          <div className='flex gap-3 justify-between items-center'>
            <label className='text-lg'>Nom: </label>
            <Input name='name' placeholder='nom' defaultValue={modal?.organization?.name ?? ''} className='w-48'/>
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

export default OrganizationModal;