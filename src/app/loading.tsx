import { Loader } from '@/modules/core';
import classNames from 'classnames';

const Loading = () => (
  <div className='fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-neutrals-100'>
    <Loader color='#4C1FA7' style={{ width: '100px' }} />
  </div>
);

export default Loading;
