import React, { InputHTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames';
import { InputSizeEnum } from './types';

type InputProps = {
  error?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  placeholder?: string;
  fullWith?: boolean;
  size?: InputSizeEnum;
} & InputHTMLAttributes<HTMLInputElement>;

const sizeClasses = {
  [InputSizeEnum.LARGE]: 'px-4 py-3 text-base',
  [InputSizeEnum.MEDIUM]: 'px-3 py-2 text-sm',
  [InputSizeEnum.SMALL]: 'px-2 py-1 text-xs',
};

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    error,
    startIcon,
    placeholder = 'Type here...',
    endIcon,
    className,
    fullWith,
    size = InputSizeEnum.LARGE,
    ...props
  },
  ref,
) => {
  return (
    <div
      className={classNames('relative', {
        '!w-full': fullWith,
      })}>
      <div
        className={classNames('flex items-center border rounded-md w-full border-slate-200', {
          'border-red-600': error,
        })}>
        {startIcon && <div className='mr-2'>{startIcon}</div>}
        <input
          ref={ref}
          placeholder={placeholder}
          className={classNames(
            'flex-1 outline-none rounded-md disabled:bg-disabled-100',
            sizeClasses[size],
            {
              'border-red-500': error,
            },
            className,
          )}
          {...props}
        />
        {endIcon && <div className='ml-2'>{endIcon}</div>}
      </div>
      {error && <span className='absolute top-full text-red-500 mt-1 text-xs'>{error}</span>}
    </div>
  );
};

export default forwardRef(Input);
