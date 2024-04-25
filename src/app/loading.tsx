import classNames from 'classnames';

const Loading = () => (
  <div className='fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-neutrals-100'>
    <div
      className={classNames(
        'h-20 w-20 animate-spin rounded-full border-2',
        'border-solid border-neutrals-800 border-t-transparent',
      )}
    />
  </div>
);

export default Loading;
