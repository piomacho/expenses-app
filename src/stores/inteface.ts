export interface IExpenseStore {
  currentExpense: IExpense;
  editConversionRate: boolean;
  errors: string[];
  expenses: IExpense[];
  euroValue: number;
  expenseSumInPLN: number;
  expenseSumInEU: number;
  deleteExpense: (expense: IExpense) => void;
  addFieldContent: (val: string, nameOfField: string) => void;
  addCurrentExpense: () => void;
  changeConversionRate: () => void;
  setEuroValue: (value: number) => void;
}

export interface IExpense {
  title: string;
  amount: string;
  euroAmount: string;
  [key: string]: string;
}
