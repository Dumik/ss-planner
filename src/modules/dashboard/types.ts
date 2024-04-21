export type Expense = {
  price: number;
  category: string;
};

export type Day = {
  date: string;
  day: string;
  amountPerDay: number;
  expenses: Expense[] | [];
};

export type PeriodType = {
  period?: string | null;
  amountOnPeriod?: number;
  dateStart?: moment.Moment;
  dateEnd?: moment.Moment;
  days: Day[];
};
