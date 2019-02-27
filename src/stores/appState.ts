import { observable, action, computed } from 'mobx';
import { toJS } from 'mobx';

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

  @action addTitle = (value: string, nameOfField: string) => {
    this.currentItem[nameOfField] = value;
  };

  @action modifyConversionRate = (value: number) => {
    this.euroValue = value;
    this.items = [];
    // return this.items.map((singleOne: any) => {
    //   return {
    //     ...singleOne,
    //     amount: this.setProperAmount(singleOne.amount),
    //     euroAmount: this.setProperAmount(singleOne.amount, true)
    //   };
    // });
  };

  @action changeConversionRate = () => {
    this.editConversionRate = !this.editConversionRate;
    // this.items = [];
    this.items = this.items.map((singleOne: any) => {
      return {
        ...singleOne,
        amount: this.setProperAmount(singleOne.amount),
        euroAmount: this.setProperAmount(singleOne.amount, true)
      };
    });
  };

  @action addCurrentItem = () => {
    if (this.inspectTitleLength(this.currentItem.title)) {
      this.items.push({
        ...this.currentItem,
        amount: this.setProperAmount(this.currentItem.amount),
        euroAmount: this.setProperAmount(this.currentItem.amount, true)
      });
    } else {
      this.errors.push('Title must have at least 5 characters !');
    }
    this.currentItem = { title: '', amount: '', euroAmount: '' };
  };

  @action deleteItem = (expense: IExpense) => {
    const index = this.items.findIndex(
      item => item.title === toJS(expense).title
    );

    this.items.splice(index, 1);
  };

  public inspectTitleLength = (title: string) => title.trim().length > 4;
  public setProperAmount = (amount: string, euro: boolean = false) => {
    console.log('jest tu a this.euro ', this.euroValue);
    const validAmount = amount.replace(',', '.');
    const roundedAmount = euro
      ? (+validAmount / this.euroValue).toFixed(2)
      : (+validAmount).toFixed(2);
    return roundedAmount.toString();
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
