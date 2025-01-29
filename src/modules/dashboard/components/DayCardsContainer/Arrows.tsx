import { ChevronLeft, ChevronRight } from 'lucide-react';

export const PreviousArrow = ({ onClick }: { onClick?: () => void }) => (
  <button onClick={onClick} className='text-indigo-400 active:text-indigo-600'>
    <ChevronLeft />
  </button>
);

export const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button onClick={onClick} className='text-indigo-400 active:text-indigo-600'>
    <ChevronRight />
  </button>
);
