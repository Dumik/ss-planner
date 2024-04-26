import React, { InputHTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames';

type InputProps = {
  error?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  placeholder?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const InputEmpty: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { error, startIcon, placeholder = 'Type here...', endIcon, className, ...props },
  ref,
) => {
  return (
    <div className='flex items-center'>
      {startIcon && <div className='mr-2'>{startIcon}</div>}
      <input
        ref={ref}
        placeholder={placeholder}
        className={classNames(
          ' outline-none px-2 py-1',
          {
            'border-red-500': error,
          },
          className,
        )}
        {...props}
      />
      {endIcon && <div className='ml-2'>{endIcon}</div>}
    </div>
  );
};

export default forwardRef(InputEmpty);
