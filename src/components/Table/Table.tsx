import * as React from 'react';
import { observer } from 'mobx-react';

import { IExpense, IFilter } from '../../stores/expensesStore';
import {
  Row,
  Table,
  HeaderRow,
  HeaderCell,
  TableCell,
  Button,
  HeaderCellWrapper,
  HeaderTitle
} from './Table.styles';

export interface ITableProps {
  expenses: IExpense[];
  deleteExpense: (expense: IExpense) => void;
  sortByParam: (param : string, order: string) => any;
  euroValue: number;
  filter: IFilter;
}

const filterStatement = (amount: number, from: number, to: number) =>{
    if(from && to) {
      return amount >= from && amount <= to;
    } else if (from) {
      return amount >= from;
    } else if (to){
      return amount <= to
    }
    return true;
}

const ExpensesTable = observer(({ expenses, deleteExpense, sortByParam, filter }: ITableProps) => {
  return (
    <Table>
      <tbody>
        <HeaderRow>
          <HeaderCell>
            <HeaderTitle>Tytuł</HeaderTitle>
            <button onClick={() => sortByParam("title", "ASC")}> up </button>
            <button onClick={() => sortByParam("title", "DESC")}> d </button>
          </HeaderCell>
          <HeaderCell>
            <HeaderTitle>Kwota (PLN)</HeaderTitle>
            <button onClick={() => sortByParam("amount", "ASC")}> up </button>
            <button onClick={() => sortByParam("amount", "DESC")}> d </button>
          </HeaderCell>
          <HeaderCell>
            <HeaderTitle>Kwota (EUR)</HeaderTitle>
            <button onClick={() => sortByParam("euroAmount", "ASC")}> up </button>
            <button onClick={() => sortByParam("euroAmount", "DESC")}> d </button>
          </HeaderCell>
          <HeaderCell>Opcje</HeaderCell>
        </HeaderRow>
        {expenses.filter(x => filterStatement(+x.amount, +filter.from, +filter.to)).map((expense: IExpense, index: number) => {
          return (
            <Row key={index} index={index}>
              <TableCell>{expense.title}</TableCell>
              <TableCell>{expense.amount}</TableCell>
              <TableCell>{expense.euroAmount}</TableCell>
              <TableCell>
                {' '}
                <Button onClick={() => deleteExpense(expense)}>Usuń</Button>
              </TableCell>
            </Row>
          );
        })}
      </tbody>
    </Table>
  );
});

export default ExpensesTable;
