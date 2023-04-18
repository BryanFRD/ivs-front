import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../component/Navbar';
import debounce from 'lodash.debounce'

const BaseScreen = () => {
  const [search, setSearch] = useState('');
  
  const handleSearch = (event) => {
    console.log('event:', event);
    setSearch(event?.target?.value ?? '');
    
  }
  
  return (
    <div className='bg-zinc-800 flex flex-col w-screen h-screen text-zinc-100'>
      <header>
        <Navbar {...{search, handleSearch}} />
      </header>
      <main className='grow max-h-full overflow-hidden'>
        <Outlet context={{search, setSearch, handleSearch: (event) => debounce(handleSearch, 250)}} />
      </main>
    </div>
  );
};

export default BaseScreen;