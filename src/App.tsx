import * as React from 'react';
import { observer, inject } from 'mobx-react';

import { ExpensesTable } from './components/Table';
import { Form } from './components/Form';
import { ConversionRate } from './components/ConversionRate';
import ErrorMessages from './components/ErrorMessages/ErrorMessages';
import Summary from './components/Summary/Summary';
import { AppWrapper, HeaderWrapper } from './App.styles';
import { Loader } from './components/Loader';
import Filters from './components/Filters/Filters';

@inject('ExpensesStore')
@observer
// no idea how to type this injection
class App extends React.Component<any> {
  componentDidMount() {
    this.props.ExpensesStore.init();
  }
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
      setEuroValue,
      loading,
      sortByParam,
      filter,
      filterByRange,
      addFilterContent,
      getInfoAboutRow,
      updateRow
    } = this.props.ExpensesStore;
    // console.log("FILTER", filter.to)
    return !loading ? (
      <AppWrapper
        style={{ backgroundColor: '#FFFAFA', height: 'calc(100vh - 144px)' }}>
        <HeaderWrapper>
          <h1>Lista wydatków</h1>

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
            <Filters
              filter={filter}
              filterByRange={filterByRange}
              addFilterContent={addFilterContent}
            />
            <ExpensesTable
              expenses={expenses}
              deleteExpense={deleteExpense}
              euroValue={euroValue}
              sortByParam={sortByParam}
              filter={filter}
              getInfoAboutRow={getInfoAboutRow}
              updateRow={updateRow}
              errors={errors}
              // addFieldContent={addFieldContent}
            />
            <Summary sumInPLN={expenseSumInPLN} sumInEURO={expenseSumInEU} />
          </div>
        )}
      </AppWrapper>
    ) : (
      <Loader />
    );
  }
}

export default App;
