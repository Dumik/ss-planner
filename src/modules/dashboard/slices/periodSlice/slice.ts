import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Expense, PeriodType } from '../../types';
import { cloneDeep, omit } from 'lodash';

type PeriodStateType = {
  period: PeriodType;
  newExpense: { dayIndex: number } & Expense;
  expense: { dayIndex: number; expenseIndex: number } & Expense;
};

const initialState: PeriodStateType = {
  newExpense: {
    dayIndex: 0,
    price: 0,
    category: '',
  },
  expense: {
    expenseIndex: 0,
    dayIndex: 0,
    price: 0,
    category: '',
  },
  period: {
    days: [],
  },
};

export const periodSlice = createSlice({
  name: 'period',
  initialState,
  reducers: {
    setPeriod: (state, action: PayloadAction<Pick<PeriodStateType, 'period'>>) => {
      state.period = action.payload.period;
    },

    addPeriodExpense: (state, action: PayloadAction<Pick<PeriodStateType, 'newExpense'>>) => {
      const updatedPeriod = cloneDeep(state.period);

      updatedPeriod.days[action.payload.newExpense.dayIndex].expenses = [
        ...updatedPeriod.days[action.payload.newExpense.dayIndex].expenses,
        omit(action.payload.newExpense, ['dayIndex']),
      ];
      state.period = updatedPeriod;
    },

    updateExpenses: (state, action: PayloadAction<Pick<PeriodStateType, 'expense'>>) => {
      const updatedPeriod = cloneDeep(state.period);

      updatedPeriod.days[action.payload.expense.dayIndex].expenses[
        action.payload.expense.expenseIndex
      ] = omit(action.payload.expense, ['dayIndex', 'expenseIndex']);

      state.period = updatedPeriod;
    },
  },
});

export const periodActions = periodSlice.actions;

export default periodSlice;
