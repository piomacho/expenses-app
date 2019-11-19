import { observable, action, computed } from 'mobx';
import { toJS } from 'mobx';
import { validateFloatNumber } from '../common/constants';
import axios from 'axios';

export interface IExpense {
  title: string;
  amount: string;
  euroAmount: string;
  [key: string]: string;
}

export interface IFilter {
  from: string;
  to: string;
  [key: string]: string;
}

const initExpenses: IExpense[] = [
  {
    title: 'Suszarka', 
    amount: '25.50',
    euroAmount: `${(25.5 / 4.382).toFixed(2)}`
  },
  {
    title: 'Żelazko', 
    amount: '323.30',
    euroAmount: `${(323.3 / 4.382).toFixed(2)}`
  },
  {
    title: 'Płyta CD', 
    amount: '5.99',
    euroAmount: `${(5.99 / 4.382).toFixed(2)}`
  }
];
class ExpensesStore {
  fetchInterval = 0;
  @observable conversionRate: string = ''; // initial value

  @action init = () => {
    this.loading = true;
    this.fetchConversionRate();
  };

  @observable
  expenses: IExpense[] = initExpenses;
  @observable loading: boolean = false;

  @observable
  currentExpense: IExpense = {
    title: '',
    amount: '',
    euroAmount: ''
  };

  @observable
  filter: IFilter = {
    from: '',
    to: '',
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
  @action addFilterContent = (value: string, nameOfField: string) => {
    this.filter[nameOfField] = value;
  };

  @action modifyConversionRate = (value: number) => {
    this.euroValue = value;
    this.expenses = [];
  };

  @action updateRow = (name: string, title: string, amount: string) => {
    const foundIndex = this.expenses.findIndex( x => x.name === name);
    this.expenses[foundIndex].title = title;
    this.expenses[foundIndex].amount = amount;
    // this.expenses[foundIndex].title = title;
  }

  @action getInfoAboutRow = (name: string) => {
    const foundIndex = this.expenses.findIndex( x => x.name === name);
    return this.expenses[foundIndex];
  }

  @action filterByRange = (from: string, to: string) => {
    this.expenses = this.expenses.filter(x => +x.amount >= +from && +x.amount <= +to)
  }

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

 @action sortByParam = (value: string, type: string, order: string) => {
   if(type === "ASC") {
      this.expenses = this.expenses.sort((a, b) => +a[value] > +b[value] ? 1 : -1);
   } else {
      this.expenses = this.expenses.sort((a, b) => +a[value] < +b[value] ? 1 : -1);
   }
 }


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
      this.errors.push('Tytuł musi mieć co najmniej 5 znaków !');
    }
    if (!validateFloatNumber(element.amount)) {
      this.errors.push('Nieprawidłowa wartość, proszę poprawić kwotę w PLN !');
    }
    if (this.inspectDuplication(element.title)) {
      this.errors.push('Istnieje już pole z podanym tytułem!');
    }
  };

  public inspectDuplication = (title: string) => {
    return this.expenses.some(e => e.title === title);
  };

  public validateEuroValue = () => {
    const currentValue = this.euroValue.toString();
    if (!validateFloatNumber(currentValue)) {
      this.errors.push(
        'Nieprawidłowa wartość, proszę poprawić wartość przeliczenia!'
      );
    }
  };
}

const appState = new ExpensesStore();
export default appState;
