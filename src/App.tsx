import * as React from 'react';
import { observer, inject } from 'mobx-react';

import { ExpensesTable } from './components/Table';
import { Form } from './components/Form';
import { ConversionRate } from './components/ConversionRate';
import ErrorMessages from './components/ErrorMessages/ErrorMessages';
import Summary from './components/Summary/Summary';
import { AppWrapper, HeaderWrapper } from './App.styles';

@inject('ExpensesStore')
@observer
// no idea how to type this injection
class App extends React.Component<any> {
  render() {
    const {
      addCurrentExpense,
      currentExpense,
      addFieldContent,
      errors,
      expenses,
      deleteExpense,
      euroValue,
      expenseSumInPLN,
      expenseSumInEU,
      changeConversionRate,
      editConversionRate,
      setEuroValue
    } = this.props.ExpensesStore;
    return (
      <AppWrapper>
        <HeaderWrapper>
          <h1>List of expenses</h1>

          <ConversionRate
            addCurrentExpense={addCurrentExpense}
            euroValue={euroValue}
            changeConversionRate={changeConversionRate}
            editConversionRate={editConversionRate}
            setEuroValue={setEuroValue}
          />
        </HeaderWrapper>
        <Form
          addCurrentExpense={addCurrentExpense}
          currentExpense={currentExpense}
          addFieldContent={addFieldContent}
        />
        <ErrorMessages errors={errors} />
        {expenses.length !== 0 && (
          <div>
            <ExpensesTable
              expenses={expenses}
              deleteExpense={deleteExpense}
              euroValue={euroValue}
            />
            <Summary sumInPLN={expenseSumInPLN} sumInEURO={expenseSumInEU} />
          </div>
        )}
      </AppWrapper>
    );
  }
}

export default App;
