import * as React from 'react';
import { observer } from 'mobx-react';

import { IExpense } from '../../stores/expensesStore';
import {
  Header,
  Row,
  Table,
  HeaderRow,
  HeaderCell,
  TableCell,
  Button
} from './Table.styles';

export interface ITableProps {
  expenses: IExpense[];
  deleteExpense: (expense: IExpense) => void;
  euroValue: number;
}

const ExpensesTable = observer(({ expenses, deleteExpense }: ITableProps) => {
  return (
    <Table>
      <Header>
        <HeaderRow>
          <HeaderCell>Title</HeaderCell>
          <HeaderCell>Amount(PLN)</HeaderCell>
          <HeaderCell>Amount(EUR)</HeaderCell>
          <HeaderCell>Options</HeaderCell>
        </HeaderRow>
      </Header>
      <tbody>
        {expenses.map((expense: IExpense, index: number) => {
          return (
            <Row index={index}>
              <TableCell>{expense.title}</TableCell>
              <TableCell>{expense.amount}</TableCell>
              <TableCell>{expense.euroAmount}</TableCell>
              <TableCell>
                {' '}
                <Button onClick={() => deleteExpense(expense)}>Delete</Button>
              </TableCell>
            </Row>
          );
        })}
      </tbody>
    </Table>
  );
});

export default ExpensesTable;
