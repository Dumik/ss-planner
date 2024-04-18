'use client';
import { Button, Input } from '@/modules/core';
import { useState } from 'react';
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const ToolBar = () => {
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(null);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  const onDatesChange = ({ startDate, endDate }: { startDate: any; endDate: any }) => {
    setDateFrom(startDate);
    setDateTo(endDate);
  };
  return (
    <div className='flex w-full gap-4'>
      <DateRangePicker
        startDate={dateFrom}
        startDateId='start_date_id'
        endDate={dateTo}
        endDateId='end_date_id'
        onDatesChange={onDatesChange}
        focusedInput={focusedInput ? focusedInput : null}
        onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
        showClearDates={true}
        hideKeyboardShortcutsPanel={true}
        isOutsideRange={() => false}
        startDatePlaceholderText='Date from'
        endDatePlaceholderText='Date to'
        customArrowIcon='—'
      />
      <Input type='number' />
      <Button variant='filled' text='Save' size='large' className='w-50' />
    </div>
  );
};

export default ToolBar;
