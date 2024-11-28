'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import { Button, ButtonSizeEnum, ButtonVariantEnum } from '@/modules/core';
import { bannerSignUp, BG1, BG3 } from '@/modules/core/assets/img';
import { useTypedSelector } from '@/store';

const Home = () => {
  const { accessToken } = useTypedSelector((state) => state.auth);
  const router = useRouter();

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('unique-features');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStart = () => {
    if (accessToken) {
      router.push('/dashboard');
    } else {
      router.push('/sign-in');
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-b text-gray-900'>
      <section className='relative flex flex-col items-center justify-center min-h-screen px-6 text-center'>
        <div className='absolute inset-0 -z-10'>
          <Image src={BG3} alt='Background' fill objectFit='cover' className='opacity-30' />
        </div>
        <motion.h1
          className='text-4xl md:text-6xl font-extrabold text-gray-800 mb-4 drop-shadow-lg'
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}>
          Save Smart, Spend Better
        </motion.h1>
        <motion.p
          className='text-lg md:text-xl text-gray-700 max-w-2xl mb-8'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}>
          Set spending limits, track your expenses, and achieve financial freedom effortlessly.
        </motion.p>
        <div className='flex space-x-4 mb-8'>
          <Button
            variant={ButtonVariantEnum.FILLED}
            size={ButtonSizeEnum.LARGE}
            text='Get Started'
            className='text-white'
            onClick={handleStart}>
            Get Started
          </Button>
        </div>

        <motion.div
          className='absolute bottom-10 flex justify-center w-full'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}>
          <Button
            variant={ButtonVariantEnum.OUTLINE}
            size={ButtonSizeEnum.LARGE}
            text='↓'
            className='bg-transparent text-gray-800 border-4  !w-14 !h-14 !rounded-full transform hover:scale-105 transition-all shadow-lg animate-pulseSlow'
            onClick={scrollToNextSection}>
            ↓
          </Button>
        </motion.div>
      </section>

      <motion.section
        id='unique-features'
        className='py-16 bg-gray-50'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}>
        <div className='max-w-7xl mx-auto px-6'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-12'>
            What Makes Smart Spender Unique?
          </h2>
          <div className='grid md:grid-cols-3 gap-12'>
            <motion.div
              className='group relative bg-white rounded-lg shadow-md p-6 transition hover:shadow-lg hover:scale-105'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}>
              <div className='absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-indigo-100 text-indigo-500 rounded-full flex items-center justify-center text-2xl group-hover:bg-indigo-200 transition'>
                📊
              </div>
              <h3 className='text-xl font-semibold mt-8 mb-2'>Daily Tracking</h3>
              <p className='text-gray-600'>
                Stay on top of your spending with easy-to-use daily tracking tools.
              </p>
            </motion.div>
            <motion.div
              className='group relative bg-white rounded-lg shadow-md p-6 transition hover:shadow-lg hover:scale-105'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.7 }}>
              <div className='absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-indigo-100 text-indigo-500 rounded-full flex items-center justify-center text-2xl group-hover:bg-indigo-200 transition'>
                🐼
              </div>
              <h3 className='text-xl font-semibold mt-8 mb-2'>Fun Gamification</h3>
              <p className='text-gray-600'>
                Keep your spending in check and grow a happy panda companion.
              </p>
            </motion.div>
            <motion.div
              className='group relative bg-white rounded-lg shadow-md p-6 transition hover:shadow-lg hover:scale-105'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}>
              <div className='absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-indigo-100 text-indigo-500 rounded-full flex items-center justify-center text-2xl group-hover:bg-indigo-200 transition'>
                💰
              </div>
              <h3 className='text-xl font-semibold mt-8 mb-2'>Reward Yourself</h3>
              <p className='text-gray-600'>Save money and use your savings to treat yourself.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className='py-16 bg-gray-50'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}>
        <div className='max-w-7xl mx-auto px-6'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-12'>
            Why You Should Start Today
          </h2>
          <div className='text-center'>
            <p className='text-lg md:text-xl text-gray-700 mb-8'>
              Managing your finances doesn't have to be complicated. With Smart Spender, you can
              take control of your spending, set goals, and stay motivated with engaging features.
            </p>
            <Image
              src={bannerSignUp}
              alt='Finance Planning'
              className='mx-auto mb-8 w-full h-96 object-cover opacity-80'
              objectFit='cover'
            />
          </div>
        </div>
      </motion.section>

      <motion.section
        className='relative py-16 bg-indigo-600 text-white'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}>
        <div className='max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center lg:justify-between'>
          <div className='text-center lg:text-left'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              Ready to Take Control of Your Spending?
            </h2>
            <p className='text-lg md:text-xl mb-6'>
              Start using Smart Spender today and build a healthier financial future.
            </p>
            <Button
              variant={ButtonVariantEnum.OUTLINE}
              size={ButtonSizeEnum.LARGE}
              text='Get Started'
              className='bg-white'
              onClick={handleStart}>
              Get Started
            </Button>
          </div>
          <div className='mt-8 lg:mt-0'>
            <Image
              src={BG1}
              alt='Reward Panda'
              width={400}
              height={400}
              className='mx-auto lg:mx-0 rounded-md opacity-80'
            />
          </div>
        </div>
      </motion.section>

      <motion.section
        className='py-16 bg-gray-50'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}>
        <div className='max-w-7xl mx-auto px-6'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-12'>
            Join the Thousands of Happy Users
          </h2>
          <div className='text-center'>
            <p className='text-lg md:text-xl text-gray-700 mb-8'>
              Our users love how simple it is to manage their finances and track their savings.
            </p>
            <div className='flex justify-center space-x-8'>
              <motion.div
                className='w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 2 }}>
                👨‍💻
              </motion.div>
              <motion.div
                className='w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 2.1 }}>
                👩‍💻
              </motion.div>
              <motion.div
                className='w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 2.2 }}>
                📱
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
