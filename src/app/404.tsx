import { Error404 } from '@/modules/core';
import Image from 'next/image';

const Page404 = () => (
  <div className='fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-neutrals-100'>
    <Image src={Error404} alt='404 - page not found' />
  </div>
);

export default Page404;
