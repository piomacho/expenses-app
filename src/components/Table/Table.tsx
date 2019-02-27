import * as React from 'react';
import { IExpense } from '../../stores/appState';
import { observer } from 'mobx-react';
import {
  Header,
  Row,
  Table,
  HeaderRow,
  HeaderCell,
  TableCell,
  Button
} from './Table.styles';
import { toJS } from 'mobx';
// import console = require('console');

export interface ITableProps {
  expenses: IExpense[];
  deleteItem: any;
  euroValue: any;
}

// const handleDelete = (expense: IExpense) => {
//    expense.title);
// };
const ExpensesTable = observer(
  ({ expenses, deleteItem, euroValue }: ITableProps) => {
    console.log('this proproproppro ', toJS(expenses), ' !!!! ', euroValue);
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
          {expenses.map((item: any, index: any) => {
            return (
              <Row index={index}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>{item.euroAmount}</TableCell>
                <TableCell>
                  {' '}
                  <Button onClick={event => deleteItem(item)}>Delete</Button>
                </TableCell>
              </Row>
            );
          })}
        </tbody>
      </Table>
    );
  }
);

export default ExpensesTable;
