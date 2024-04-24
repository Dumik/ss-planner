'use client';

import { bannerSignUp } from '@/modules/core/assets/img';
import Image from 'next/image';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='grid-cols-5 h-screen lg:grid'>
      <div className='col-span-5 lg:col-span-3  max-h-80 lg:!max-h-screen'>
        <Image
          alt='Hero Picture'
          src={bannerSignUp}
          className='size-full lg:max-h-screen object-cover max-h-80'
        />
      </div>
      <div className='col-span-5 h-fit lg:col-span-2 lg:h-full'>
        <div className='lg:h-full'>{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
