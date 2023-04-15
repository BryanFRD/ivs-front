import React, { Fragment } from 'react';
import Button from '../component/Button';
import { Tab } from '@headlessui/react';
import OrganizationTabPanel from '../component/panel/OrganizationTabPanel';
import BuildingTabPanel from '../component/panel/BuildingTabPanel';
import RoomTabPanel from '../component/panel/RoomTabPanel';

const HomeScreen = () => {
  const options = [
    {id: 'organizations', name: 'Organisations'},
    {id: 'buildiqdsngs', name: 'Bâtiments'},
    {id: 'rooms', name: 'Pièces'}
  ];
  
  return (
    <Tab.Group as='div' className='flex h-full'>
      <Tab.List as='div' className='flex flex-col h-full'>
        {options?.map(({id, name}) => 
          <Tab as='div' key={id} className='outline-none'>
            {({selected}) =>
              <Button className={`w-full px-10 py-5 hover:bg-zinc-700 border-none rounded-none ${selected && 'bg-zinc-700'}`}>
                {name}
              </Button>
            }
          </Tab>
        )}
      </Tab.List>
      <Tab.Panels className='grow h-full bg-zinc-700 p-5'>
        <OrganizationTabPanel />
        <BuildingTabPanel />
        <RoomTabPanel />
      </Tab.Panels>
    </Tab.Group>
  );
};

export default HomeScreen;