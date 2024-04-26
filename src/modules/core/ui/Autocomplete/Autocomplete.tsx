'use client';
import React, { useState } from 'react';
import Autocomplete from 'react-autocomplete';
import { Input, InputEmpty } from '../Input';
import classNames from 'classnames';
import { expenseCategories } from '@/modules/dashboard';

const ReactAutocomplete = ({ ...props }) => {
  const [value, setValue] = useState('');

  return (
    <div className='w-full'>
      <Autocomplete
        items={expenseCategories}
        shouldItemRender={(item, value) => item.toLowerCase().indexOf(value.toLowerCase()) > -1}
        getItemValue={(item) => item}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onSelect={(value) => setValue(value)}
        inputProps={{ ...props }}
        renderInput={(inputProps) => <InputEmpty {...inputProps} />}
        renderMenu={(item) => (
          <div className='absolute bg-white shadow !max-h-40 w-full mt-2 -ml-1 overflow-hidden overflow-y-visible shadow-purple-100 z-10'>
            {item}
          </div>
        )}
        renderItem={(item, isHighlighted) => (
          <div
            className={classNames('bg-white px-4 py-2 w-full hover:bg-purple-50 cursor-pointer', {
              '!bg-purple-50': isHighlighted,
            })}>
            {item}
          </div>
        )}
      />
    </div>
  );
};
export default ReactAutocomplete;
