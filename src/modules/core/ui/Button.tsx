import { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';

type Props = {
  className?: string;
  text?: string;
  onClick?: () => void;
  isDisabled?: boolean;
  size?: 'large' | 'medium';
  variant?: 'filled' | 'outline';
  isLoading?: boolean;
  loadingText?: string;
  isSuccessful?: boolean;
  successfulText?: string;
  successfulIcon?: JSX.Element;
} &  PropsWithChildren;

const sizeClasses = {
  large: 'p-3 md:p-4',
  medium: 'p-3',
};

const variantClasses = {
  filled: 'bg-purple-700 hover:bg-purple-600 text-white p-20',
  outline: 'border border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white',
};

const Button: FC<Props> = ({
  text,
  className,
  onClick,
  variant = 'filled',
  size = 'large',
  isDisabled,
  isLoading,
  loadingText,
  isSuccessful,
  successfulText,
  successfulIcon,
  children,
}) => (
  <button
    type="button"
    className={classNames(
      'flex items-center justify-center rounded-md text-center font-bold transition duration-300 bg-slate-950',
      sizeClasses[size],
      variantClasses[variant],
      className,
      {
        'pointer-events-none cursor-not-allowed': isLoading || isSuccessful || isDisabled,
      }
    )}
    onClick={onClick}
    disabled={isDisabled}
  >
    {isLoading && (
      <>
        {loadingText}
      </>
    )}
    {isSuccessful && (
      <>
        {successfulIcon}
        {successfulText}
      </>
    )}
    {!isLoading && !isSuccessful && (children || text)}
  </button>
);

export default Button;
