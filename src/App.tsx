import * as React from 'react';

import { observer, inject } from 'mobx-react';

import { FieldInput } from './FieldInput';
import { ExpensesTable } from './components/Table';
import { Form } from './components/Form';
import { ConversionRate } from './components/ConversionRate';

@inject('ExpensesStore')
@observer
class App extends React.Component<any, any> {
  render() {
    const { ExpensesStore } = this.props;
    return (
      <div style={{ padding: '40px 60px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <h1>List of expenses</h1>
          <ConversionRate />
        </div>
        <Form
          addCurrentItem={ExpensesStore.addCurrentItem}
          currentItem={ExpensesStore.currentItem}
          addTitle={ExpensesStore.addTitle}
        />
        {ExpensesStore.errors &&
          ExpensesStore.errors.map((errorMsg: string) => (
            <p style={{ color: 'red' }}> {errorMsg}</p>
          ))}

        <ExpensesTable
          expenses={ExpensesStore.items}
          deleteItem={ExpensesStore.deleteItem}
          euroValue={ExpensesStore.euroValue}
        />
        <div>
          <p>
            Sum: {ExpensesStore.expenseSumInPLN} PLN (
            {ExpensesStore.expenseSumInEU}EUR)
          </p>
        </div>
      </div>
    );
  }
}

export default App;
