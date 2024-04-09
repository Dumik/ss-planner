import Image from 'next/image';
import React from 'react';
import { Logo } from '@/modules/core';

const Header = () => {
  return (
    <header className=' text-white p-1 sticky border-2 border-purple-700 '>
      <div>
        <div className='container mx-auto flex  items-center'>
          <Image
            src={Logo}
            width={60}
            height={50}
            alt=''
            className='text-white stroke-white fill-white'
          />
          <span className='text-purple-700 font-semibold'>Smart Spender</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
