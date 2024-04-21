import React from 'react';
import classNames from 'classnames';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  error,
  startIcon,
  placeholder = 'Type here...',
  endIcon,
  className,
  ...rest
}) => {
  return (
    <div className='relative'>
      <div
        className={classNames('flex items-center border rounded-md w-full border-purple-700', {
          'border-red-600': error,
        })}>
        {startIcon && <div className='mr-2'>{startIcon}</div>}
        <input
          placeholder={placeholder}
          className={classNames(
            'flex-1 outline-none px-4 py-3 rounded-md disabled:bg-disabled-100',
            {
              'border-red-500': error,
            },
            className,
          )}
          {...rest}
        />
        {endIcon && <div className='ml-2'>{endIcon}</div>}
      </div>
      {error && <span className='absolute top-full text-red-500 mt-1'>{error}</span>}
    </div>
  );
};

export default Input;
