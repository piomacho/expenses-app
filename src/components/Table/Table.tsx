import * as React from 'react';
import { observer } from 'mobx-react';
import Popup from "reactjs-popup";

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
                <Button usage="remove" onClick={() => deleteExpense(expense)}>Usuń</Button>
                <Popup trigger={ <Button usage="edit">Edytuj</Button>} modal>
    {close => (
      <div className="modal">
        <a className="close" onClick={close}>
          &times;
        </a>
        <div className="header"> Modal Title </div>
        <div className="content">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
          Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
          delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
          <br />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
          commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae
          explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
        </div>
        <div className="actions">
          <Popup
            trigger={<button className="button"> Trigger </button>}
            position="top center"
            closeOnDocumentClick
          >
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
              magni omnis delectus nemo, maxime molestiae dolorem numquam
              mollitia, voluptate ea, accusamus excepturi deleniti ratione
              sapiente! Laudantium, aperiam doloribus. Odit, aut.
            </span>
          </Popup>
          <button
            className="button"
            onClick={() => {
              console.log("modal closed ");
              close();
            }}
          >
            close modal
          </button>
        </div>
      </div>
    )}
  </Popup>
              </TableCell>
            </Row>
          );
        })}
      </tbody>
    </Table>
  );
});

export default ExpensesTable;
