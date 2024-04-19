export type Expense = {
  price: number;
  category: string;
};

export type Day = {
  date: string;
  day: string;
  amountPerDay: number;
  expenses: Expense[];
};

export type InterfaceData = {
  days: Day[];
};
