'use client';

import React, { InputHTMLAttributes, forwardRef, useState } from 'react';
import Autocomplete from 'react-autocomplete';
import { InputEmpty } from '@/core/ui';
import classNames from 'classnames';
import { expenseCategories } from '@/modules/dashboard';
import { UseFormRegisterReturn } from 'react-hook-form';

type ReactAutocompleteProps = {
  value: string;
  onSelect: (value: string) => void;
  register: UseFormRegisterReturn<string>;
} & InputHTMLAttributes<HTMLInputElement>;

const ReactAutocomplete = forwardRef<HTMLInputElement, ReactAutocompleteProps>(
  ({ value, onSelect, register, ...props }, ref) => {
    const [inputValue, setInputValue] = useState(value);

    return (
      <div className='w-full'>
        <Autocomplete
          items={expenseCategories}
          shouldItemRender={(item, value) => {
            if (typeof value === 'string') {
              return item.toLowerCase().indexOf(value.toLowerCase()) > -1;
            }
            return false;
          }}
          getItemValue={(item) => item}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onSelect={(value) => {
            onSelect(value);
            setInputValue(value);
          }}
          inputProps={{
            ...props,
          }}
          renderInput={(inputProps) => <InputEmpty ref={ref} {...inputProps} />}
          renderMenu={(item, value) => (
            <div
              key={value}
              className='absolute bg-white shadow !max-h-40 w-full mt-2 -ml-1 overflow-hidden overflow-y-visible shadow-purple-100 z-10'>
              {item}
            </div>
          )}
          renderItem={(item, isHighlighted) => (
            <div
              key={item}
              className={classNames('bg-white px-4 py-2 w-full hover:bg-purple-50 cursor-pointer', {
                '!bg-purple-50': isHighlighted,
              })}>
              {item}
            </div>
          )}
        />
      </div>
    );
  },
);

export default ReactAutocomplete;
