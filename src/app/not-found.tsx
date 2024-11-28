'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

import { PANDAGif } from '@/modules/core/assets/img';

const Page404 = () => {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-gray-900'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='mb-8'>
        <Image src={PANDAGif} alt='Panda GIF' width={300} height={300} className='rounded-md ' />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className='text-3xl font-bold sm:text-5xl'>
        Oops! Page not found.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className='mt-4 text-base text-gray-600 sm:text-lg'>
        Looks like the page you’re looking for doesn’t exist.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className='mt-6 flex gap-4'>
        <Link
          href='/'
          className='rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 transition'>
          Go Back Home
        </Link>
        <Link
          href='/dashboard'
          className='rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition'>
          Go to Dashboard
        </Link>
      </motion.div>
    </main>
  );
};

export default Page404;
