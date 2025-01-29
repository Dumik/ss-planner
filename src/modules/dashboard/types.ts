export type Expense = {
  price: number;
  category: string;
};

export type Day = {
  date: string | Date;
  day: string;
  amountPerDay: number;
  expenses: Expense[] | [];
};

export type PeriodType = {
  id: string;
  period?: string | null;
  amountOnPeriod?: number;
  dateStart?: string | Date;
  dateEnd?: string | Date;
  days: Day[];
};
