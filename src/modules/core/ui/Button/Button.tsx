import { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { ButtonSizeEnum, ButtonVariantEnum } from './types';

type Props = {
  className?: string;
  text?: string;
  onClick?: () => void;
  isDisabled?: boolean;
  size?: ButtonSizeEnum;
  variant?: ButtonVariantEnum;
  isLoading?: boolean;
  loadingText?: string;
  isSuccessful?: boolean;
  successfulText?: string;
  successfulIcon?: JSX.Element;
  fullWith?: boolean;
  type?: 'submit' | 'reset' | 'button';
} & PropsWithChildren;

const sizeClasses = {
  large: 'px-6 py-3 text-base',
  medium: 'px-4 py-2 text-sm',
  small: 'px-3 py-1 text-xs',
};

const variantClasses = {
  [ButtonVariantEnum.FILLED]: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
  [ButtonVariantEnum.OUTLINE]:
    'border border-indigo-600 text-indigo-600 hover:bg-indigo-100 focus:ring-indigo-400',
  [ButtonVariantEnum.TEXT]: 'text-indigo-600 hover:text-indigo-500 focus:ring-indigo-300',
};

const Button: FC<Props> = ({
  text,
  className,
  onClick,
  variant = ButtonVariantEnum.FILLED,
  size = ButtonSizeEnum.LARGE,
  isDisabled = false,
  isLoading = false,
  loadingText = 'Loading...',
  isSuccessful = false,
  successfulText = 'Success!',
  successfulIcon,
  fullWith = false,
  children,
  type = 'button',
}) => {
  return (
    <button
      type={type}
      className={classNames(
        'flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
        sizeClasses[size],
        variantClasses[variant],
        {
          'cursor-not-allowed opacity-50': isLoading || isSuccessful || isDisabled,
          'w-full': fullWith,
        },
        className,
      )}
      onClick={onClick}
      disabled={isDisabled || isLoading || isSuccessful}>
      {isLoading ? (
        <span className='flex items-center gap-2'>
          <span className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></span>
          {loadingText}
        </span>
      ) : isSuccessful ? (
        <span className='flex items-center gap-2'>
          {successfulIcon}
          {successfulText}
        </span>
      ) : (
        children || text
      )}
    </button>
  );
};

export default Button;
