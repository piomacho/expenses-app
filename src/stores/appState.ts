import { observable, action, computed } from 'mobx';
import { toJS } from 'mobx';
import { validateFloatNumber } from '../common/constants';

export interface IExpense {
  title: string;
  amount: string;
  euroAmount: string;
  [key: string]: string;
}

class Applicationstate {
  @observable
  items: IExpense[] = [];

  @observable
  currentItem: IExpense = {
    title: '',
    amount: '',
    euroAmount: ''
  };

  @observable
  euroValue: number = 4.382;

  @observable
  editConversionRate: boolean = false;

  @observable
  errors: string[] = [];

  @action addFieldContent = (value: string, nameOfField: string) => {
    this.currentItem[nameOfField] = value;
  };

  @action modifyConversionRate = (value: number) => {
    this.euroValue = value;
    this.items = [];
  };

  public validateEuroValue = () => {
    const currentValue = this.euroValue.toString();
    if (!validateFloatNumber(currentValue)) {
      this.errors.push('Invalid number, please correct conversion rate !');
    }
  };
  @action changeConversionRate = () => {
    this.editConversionRate = !this.editConversionRate;
    this.errors = [];

    this.validateEuroValue();
    if (!this.errors.length) {
      this.items = this.items.map((singleOne: IExpense) => {
        return {
          ...singleOne,
          amount: this.setProperAmount(singleOne.amount),
          euroAmount: this.setProperAmount(singleOne.amount, true)
        };
      });
    }
  };

  @action addCurrentItem = () => {
    this.errors = [];
    this.inspectValues(this.currentItem);
    if (!this.errors.length) {
      this.items.push({
        ...this.currentItem,
        amount: this.setProperAmount(this.currentItem.amount),
        euroAmount: this.setProperAmount(this.currentItem.amount, true)
      });
      this.currentItem = { title: '', amount: '', euroAmount: '' };
    }
  };

  @action deleteItem = (expense: IExpense) => {
    const index = this.items.findIndex(
      item => item.title === toJS(expense).title
    );

    this.items.splice(index, 1);
  };

  public inspectTitleLength = (title: string) => title.trim().length > 4;
  public setProperAmount = (amount: string, euro: boolean = false) => {
    const validAmount = amount.replace(',', '.');
    const roundedAmount = euro
      ? (+validAmount / this.euroValue).toFixed(2)
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
  };

  @computed get expenseSumInPLN() {
    return (
      this.items.length &&
      this.items.reduce((allExpenses, currentExpense) => {
        return (allExpenses += +currentExpense.amount);
      }, 0)
    );
  }
  @computed get expenseSumInEU() {
    return (
      this.items.length &&
      this.items.reduce((allExpenses, currentExpense) => {
        return (allExpenses += +currentExpense.euroAmount);
      }, 0)
    );
  }
}

const appState = new Applicationstate();
export default appState;
