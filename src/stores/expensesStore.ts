import { observable, action, computed } from 'mobx';
import { toJS } from 'mobx';
import { validateFloatNumber } from '../common/constants';
import axios from 'axios';

export interface IExpense {
  title: string;
  amount: string;
  euroAmount: string;
  [key: string]: string;
  // dashboard: string;
}

class ExpensesStore {
  fetchInterval = 0;
  @observable conversionRate: string = ''; // initial value

  // call from componentDidMount or whatever
  @action init = () => {
    // if (!this.fetchInterval) {
    this.loading = true;
    this.fetchConversionRate(); // initial fetch
    // this.loading = false;
    // this.fetchInterval = setInterval(() => this.fetchConversionRate(), 1000);
    // }
  };

  @observable
  expenses: IExpense[] = [];
  @observable loading: boolean = false;

  @observable
  currentExpense: IExpense = {
    title: '',
    amount: '',
    euroAmount: ''
  };

  @observable
  euroValue: number | string = 4.382;

  @observable
  editConversionRate: boolean = false;

  @observable
  errors: string[] = [];

  @action fetchConversionRate = () => {
    this.loading = true;
    axios
      .get(`https://api.exchangeratesapi.io/latest?base=EUR&symbols=PLN`)
      .then(response => response.data as any)
      .then(data => {
        this.euroValue = +data.rates.PLN.toFixed(4);
        this.loading = false;
      })
      .catch(error => {
        this.loading = false;
        console.error('Error getting panel info: ' + error.toString());
      });
  };

  @action addFieldContent = (value: string, nameOfField: string) => {
    this.currentExpense[nameOfField] = value;
  };

  @action modifyConversionRate = (value: number) => {
    this.euroValue = value;
    this.expenses = [];
  };

  @action changeConversionRate = () => {
    this.editConversionRate = !this.editConversionRate;
    this.errors = [];

    this.validateEuroValue();
    if (!this.errors.length) {
      this.expenses = this.expenses.map((singleOne: IExpense) => {
        return {
          ...singleOne,
          amount: this.setProperAmount(singleOne.amount),
          euroAmount: this.setProperAmount(singleOne.amount, true)
        };
      });
    }
  };

  @action setEuroValue = (value: string) => {
    this.euroValue = value;
  };

  @action addCurrentExpense = () => {
    this.errors = [];
    this.inspectValues(this.currentExpense);
    if (!this.errors.length) {
      this.expenses.push({
        ...this.currentExpense,
        amount: this.setProperAmount(this.currentExpense.amount),
        euroAmount: this.setProperAmount(this.currentExpense.amount, true)
      });
      this.currentExpense = { title: '', amount: '', euroAmount: '' };
    }
  };

  @action deleteExpense = (expense: IExpense) => {
    const index = this.expenses.findIndex(
      expenseElement => expenseElement.title === toJS(expense).title
    );

    this.expenses.splice(index, 1);
  };

  @computed get expenseSumInPLN() {
    return (
      this.expenses.length &&
      this.expenses.reduce((allExpenses, currentExpense) => {
        return (allExpenses += +currentExpense.amount);
      }, 0)
    );
  }
  @computed get expenseSumInEU() {
    return (
      this.expenses.length &&
      this.expenses.reduce((allExpenses, currentExpense) => {
        return (allExpenses += +currentExpense.euroAmount);
      }, 0)
    );
  }

  public inspectTitleLength = (title: string) => title.trim().length > 4;
  public setProperAmount = (amount: string, euro: boolean = false) => {
    const validAmount = amount.replace(',', '.');
    const roundedAmount = euro
      ? (+validAmount / +this.euroValue).toFixed(2)
      : (+validAmount).toFixed(2);
    return roundedAmount.toString();
  };

  public inspectValues = (element: IExpense) => {
    if (!this.inspectTitleLength(element.title)) {
      this.errors.push('Title must have at least 5 characters !');
    }
    if (!validateFloatNumber(element.amount)) {
      this.errors.push('Invalid number, please correct PLN amount !');
    }
    if (this.inspectDuplication(element.title)) {
      this.errors.push('There is already expense with this title!');
    }
  };

  public inspectDuplication = (title: string) => {
    return this.expenses.some(e => e.title === title);
  };

  public validateEuroValue = () => {
    const currentValue = this.euroValue.toString();
    if (!validateFloatNumber(currentValue)) {
      this.errors.push('Invalid number, please correct conversion rate !');
    }
  };
}

const appState = new ExpensesStore();
export default appState;
