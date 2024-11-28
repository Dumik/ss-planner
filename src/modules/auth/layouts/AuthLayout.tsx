'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

import { bannerSignUp, BG2 } from '@/modules/core/assets/img';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className='grid-cols-5 h-screen lg:grid'>
      <div className='col-span-5 lg:col-span-3 max-h-80 lg:!max-h-screen relative'>
        <Image
          alt='Hero Picture'
          src={pathname === '/sign-up' ? BG2 : bannerSignUp}
          className='size-full lg:max-h-screen object-cover max-h-80'
        />
      </div>

      <div className='col-span-5 h-fit lg:col-span-2 lg:h-full flex justify-center'>
        <div className='lg:h-full w-full max-w-96'>{children}</div>

        <Link href='/' passHref>
          <button className='absolute top-4 right-4 bg-indigo-700 text-white p-3 rounded-full hover:bg-indigo-800 transition'>
            <FaHome size={24} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AuthLayout;
