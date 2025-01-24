'use client';
import { useId, useState, useEffect } from 'react';
import { addDays, format, isBefore, startOfDay } from 'date-fns';
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';

import { Button, ButtonSizeEnum, ButtonVariantEnum, DialogWrapper, Input } from '@/modules/core';
import { usePeriodActions } from '@/modules/dashboard/slices';
import { PeriodType } from '@/modules/dashboard/types';
import { useTypedSelector } from '@/store';
import { getDaysBetweenDates, getTotalPeriodAmount } from '@/dashboard/utils';
import { useAuthUser } from '@/modules/auth';
import {
  useDeletePeriodDocumentMutation,
  useFetchPeriodsForUserQuery,
  useSavePeriodToFirestoreMutation,
} from '@/dashboard/api';
import classNames from 'classnames';

const ToolBar = () => {
  const { user } = useAuthUser();
  const { period } = useTypedSelector((state) => state.period);
  const { setPeriod, resetPeriod } = usePeriodActions();

  const [createPeriod] = useSavePeriodToFirestoreMutation();
  const [deletePeriod] = useDeletePeriodDocumentMutation();
  const { data, refetch } = useFetchPeriodsForUserQuery(user?.uid);

  const randomId = useId();

  const [dateFrom, setDateFrom] = useState<Date | null>(
    (period?.dateStart && new Date(period?.dateStart)) || null,
  );
  const [dateTo, setDateTo] = useState<Date | null>(
    (period?.dateEnd && new Date(period?.dateEnd)) || null,
  );
  const [amount, setAmount] = useState<string | number>(period?.amountOnPeriod || '');
  const [errors, setErrors] = useState<{ amount?: boolean }>();
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const [isDateError, setIsDateError] = useState('');

  const totalAmount = getTotalPeriodAmount(period);
  const daysBetweenDates = getDaysBetweenDates(
    dateFrom || new Date(period?.dateStart || ''),
    dateTo || new Date(period?.dateEnd || ''),
  );

  const isDateInPast = dateFrom ? isBefore(startOfDay(dateFrom), startOfDay(new Date())) : false;

  const onDatesChange = ({
    startDate,
    endDate,
  }: {
    startDate: Date | null;
    endDate: Date | null;
  }) => {
    if (isDateInPast) {
      setIsDateError('Start date cannot be in the past');
    }

    if (!isDateInPast) {
      setIsDateError('');
    }

    setDateFrom(startDate);
    setDateTo(endDate);
  };

  const handleConfirm = () => {
    const datesBetween: Date[] | null =
      dateTo && dateFrom
        ? Array.from({ length: daysBetweenDates! }, (_, index) => addDays(dateFrom, index))
        : null;

    if (+amount < 1) {
      setErrors({ amount: true });
      return;
    }

    if (daysBetweenDates! < 5) {
      setIsDateError('Minimum 5 days');
      return;
    }
    if (daysBetweenDates! > 31) {
      setIsDateError('Max 31 days');
      return;
    }

    const periodData: PeriodType = {
      id: randomId,
      amountOnPeriod: +amount,
      dateStart: format(dateFrom!, 'yyyy/MM/dd'),
      dateEnd: format(dateTo!, 'yyyy/MM/dd'),
      period:
        datesBetween &&
        `${format(datesBetween[0], 'yyyy/MM/dd')}-${format(
          datesBetween[datesBetween.length - 1],
          'yyyy/MM/dd',
        )}`,
      days: [...Array(daysBetweenDates)].map((_, index) => {
        return {
          date: datesBetween ? format(datesBetween[index], 'yyyy/MM/dd') : '',
          day: datesBetween ? format(datesBetween[index], 'EEEE') : '',
          amountPerDay: +(+amount / daysBetweenDates!).toFixed(1) || 0,
          expenses: [],
        };
      }),
    };

    setPeriod({ period: periodData });
    createPeriod({ periodData, userId: user?.uid });
    setIsOpenDialog(false);
  };

  const handleResetPeriod = () => {
    setDateTo(null);
    setDateFrom(null);
    setAmount('');
    deletePeriod({ documentId: data?.docId || '' });
    resetPeriod();
    refetch();
    setIsOpenDialog(false);
  };

  useEffect(() => {
    if (period?.dateStart && !dateFrom) {
      setDateFrom(new Date(period?.dateStart));
    }
    if (period?.dateEnd && !dateTo) {
      setDateTo(new Date(period?.dateEnd));
    }
  }, [dateFrom, dateTo, period?.dateEnd, period?.dateStart]);

  const today = new Date();

  return (
    <div
      className={classNames(
        'flex flex-col w-full gap-4 p-3 rounded-md  justify-between xl:flex-row bg-white',
        {
          'sm:flex-row': !!period?.amountOnPeriod,
        },
      )}>
      <div className='flex justify-center items-center w-full xl:justify-start'>
        {period.amountOnPeriod && totalAmount >= 0 && daysBetweenDates ? (
          <div className='flex gap-2 flex-col sm:flex-row items-center justify-center xl:items-start xl:justify-start sm:w-full sm:text-center'>
            <span className='text-lg font-light text-nowrap sm:!text-center'>
              Period -{' '}
              <span className='text-lg  text-gray-900 font-medium'>
                {daysBetweenDates + ' days, '}
              </span>
            </span>
            <span className='text-lg font-light text-nowrap  sm:!text-center'>
              Total expenses -{' '}
              <span className='text-lg font-medium text-gray-900'>{totalAmount},</span>
            </span>
            <span className='text-lg font-light text-nowrap sm:!text-center'>
              Amount on period -
              <span className='text-lg font-medium text-gray-900'>{period.amountOnPeriod}</span>
            </span>
          </div>
        ) : (
          <span className='text-lg font-light'>
            Select the days and amount on the period:{' '}
            <span className='text-lg font-medium text-gray-900 '>
              {daysBetweenDates! > 1 ? daysBetweenDates + ' days' : ''}
            </span>
          </span>
        )}
      </div>
      <div className='flex flex-col gap-3 justify-center tablet:flex-row w-full xl:justify-end'>
        {!!period?.amountOnPeriod ? (
          <div className='w-full relative hidden xl:block'></div>
        ) : (
          <div className='w-full relative'>
            <span className='absolute bottom-full text-red-500 text-xs'>{isDateError}</span>

            <Datepicker
              disabled={!!period?.dateStart && !!period?.dateEnd}
              value={{ startDate: dateFrom, endDate: dateTo }}
              onChange={(value) => {
                onDatesChange({ startDate: value?.startDate!, endDate: value?.endDate! });
              }}
              placeholder='Select dates'
              primaryColor='indigo'
              containerClassName='flex items-center border rounded-md w-full border-slate-200 px-2 py-1 text-base'
              minDate={today}
              separator='-'
            />
          </div>
        )}
        <div className='flex gap-3 w-full'>
          {!!period?.amountOnPeriod ? (
            <div className='w-full relative hidden xl:block'></div>
          ) : (
            <Input
              value={period?.amountOnPeriod || amount}
              type='number'
              onChange={(e) => setAmount(e.target.value)}
              error={errors?.amount ? 'Enter the amount' : ''}
              disabled={!!period?.amountOnPeriod}
              className='xl:!w-auto !w-full'
              fullWith
            />
          )}
          {period.amountOnPeriod ? (
            <DialogWrapper
              isOpen={isOpenDialog}
              onOpenChange={(isOpen) => setIsOpenDialog(isOpen)}
              className='w-full flex justify-center items-center'
              openElement={
                <span
                  className={classNames(
                    'flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
                    'border border-indigo-600 text-indigo-600 hover:bg-indigo-100 focus:ring-indigo-400 px-4 py-2 text-sm max-w-80 w-full',
                    {
                      'cursor-not-allowed opacity-50':
                        !dateTo || !dateFrom || !amount || !!isDateError,
                      'w-full': true,
                    },
                  )}>
                  Reset
                </span>
              }>
              <div className='w-full flex flex-col justify-center items-center p-4 gap-10'>
                <span className=' w-full text-xl font-semibold text-center'>
                  Do you really wont to reset period?
                </span>
                <div className='flex flex-col justify-center items-center gap-4 w-full sm:flex-row'>
                  <Button
                    variant={ButtonVariantEnum.OUTLINE}
                    text='Confirm'
                    onClick={handleResetPeriod}
                    fullWith
                  />
                  <Button
                    variant={ButtonVariantEnum.FILLED}
                    text='Cancel'
                    className='min-w-52 w-full'
                    onClick={() => {
                      setIsOpenDialog(false);
                    }}
                    fullWith
                  />
                </div>
              </div>
            </DialogWrapper>
          ) : (
            <Button
              variant={ButtonVariantEnum.FILLED}
              text='Generate'
              onClick={handleConfirm}
              size={ButtonSizeEnum.MEDIUM}
              isDisabled={!dateTo || !dateFrom || !amount || !!isDateError}
              fullWith
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolBar;
