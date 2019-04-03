import * as React from 'react';
import { observer } from 'mobx-react';

import { IExpense } from '../../stores/expensesStore';
import {
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
      <tbody>
        <HeaderRow>
          <HeaderCell>Tytuł</HeaderCell>
          <HeaderCell>KwotaPLN)</HeaderCell>
          <HeaderCell>Kwota(EUR)</HeaderCell>
          <HeaderCell>Opcje</HeaderCell>
        </HeaderRow>
        {expenses.map((expense: IExpense, index: number) => {
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
