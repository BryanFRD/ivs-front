import { Dialog } from '@headlessui/react';
import React from 'react';

const Modal = ({open, setOpen, children}) => {
  return (
    <Dialog open={Boolean(open)} onClose={() => setOpen(false)} className='relative z-50'>
      <div className='fixed inset-0 flex items-center justify-center p-4 bg-zinc-900 bg-opacity-50'>
        {children}
      </div>
    </Dialog>
  );
};

export default Modal;