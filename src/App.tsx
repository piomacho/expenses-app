import * as React from 'react';

import { observer, inject } from 'mobx-react';

import { FieldInput } from './FieldInput';
import { ExpensesTable } from './components/Table';
import { Form } from './components/Form';
import { ConversionRate } from './components/ConversionRate';
import ErrorMessages from './components/ErrorMessages/ErrorMessages';

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
          addFieldContent={ExpensesStore.addFieldContent}
        />
        <ErrorMessages errors={ExpensesStore.errors} />
        {ExpensesStore.items.length !== 0 && (
          <div>
            <ExpensesTable
              expenses={ExpensesStore.items}
              deleteItem={ExpensesStore.deleteItem}
              euroValue={ExpensesStore.euroValue}
            />
            <div>
              <p>
                Sum: {ExpensesStore.expenseSumInPLN} PLN (
                {ExpensesStore.expenseSumInEU.toFixed(2)} EUR)
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
