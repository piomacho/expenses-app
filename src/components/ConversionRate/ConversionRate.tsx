import * as React from 'react';

import { observer, inject } from 'mobx-react';

@inject('ExpensesStore')
@observer
class ConversionRate extends React.Component<any, any> {
  public handleSubmit = (e: any) => {
    const { addCurrentItem } = this.props;
    e.preventDefault();
    addCurrentItem();
  };
  // trim
  public handleChange = (e: any) => {
    console.log(e.target.value);
    this.props.ExpensesStore.euroValue = e.target.value;
  };

  public handleTo = () => {
    this.props.ExpensesStore.changeConversionRate();
  };
  render() {
    const { ExpensesStore, modifyConverionRate } = this.props;

    return (
      <div>
        {' '}
        <div>
          {' '}
          1 EUR ={' '}
          {!ExpensesStore.editConversionRate ? (
            ExpensesStore.euroValue
          ) : (
            <input
              value={ExpensesStore.euroValue}
              onChange={this.handleChange}
            />
          )}{' '}
          PLN
        </div>
        <div
          style={{
            width: '30px',
            height: '30px',
            backgroundColor: '#aaaaaa'
          }}
          onClick={this.handleTo}>
          {!ExpensesStore.editConversionRate ? 'Edit' : 'Reset'}
        </div>
      </div>
    );
  }
}

export default ConversionRate;
