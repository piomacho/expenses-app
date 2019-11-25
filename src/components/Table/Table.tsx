import * as React from 'react';
import { observer } from 'mobx-react';
import Popup from 'reactjs-popup';

import { IExpense, IFilter } from '../../stores/expensesStore';
import {
  Row,
  Table,
  HeaderRow,
  HeaderCell,
  TableCell,
  Button,
  HeaderCellWrapper,
  HeaderTitle,
  ButtonsWrapper,
  CellContainer,
  ActionButton
} from './Table.styles';
import PopupModal from '../PopUpModal/PopUpModal';
import EditItemModal from '../EditItemModal/EditItemModal';
import PictureModal from '../PictureModal/PictureModal';

export interface ITableProps {
  expenses: IExpense[];
  deleteExpense: (expense: IExpense) => void;
  updateRow: (title: string, value: string, nameOfField: string) => void;
  sortByParam: (param: string, order: string) => any;
  euroValue: number;
  filter: IFilter;
  getInfoAboutRow: (title: string) => IExpense;
  errors: string[];
}

const filterStatement = (amount: number, from: number, to: number) => {
  if (from && to) {
    return amount >= from && amount <= to;
  } else if (from) {
    return amount >= from;
  } else if (to) {
    return amount <= to;
  }
  return true;
};

const ExpensesTable = observer(
  ({
    expenses,
    deleteExpense,
    sortByParam,
    filter,
    getInfoAboutRow,
    updateRow,
    errors
  }: ITableProps) => {
    return (
      <Table>
        <tbody>
          <HeaderRow>
            <HeaderCell>
              <CellContainer>
                <HeaderTitle>Tytuł</HeaderTitle>
                <ButtonsWrapper>
                  <ActionButton onClick={() => sortByParam('title', 'ASC')}>
                    &#8593;
                  </ActionButton>
                  <ActionButton
                    style={{ marginLeft: '10px' }}
                    onClick={() => sortByParam('title', 'DESC')}>
                    {' '}
                    &#8595;
                  </ActionButton>
                </ButtonsWrapper>
              </CellContainer>
            </HeaderCell>
            <HeaderCell>
              <CellContainer>
                <HeaderTitle>Kwota (PLN)</HeaderTitle>
                <ButtonsWrapper>
                  <ActionButton onClick={() => sortByParam('amount', 'ASC')}>
                    {' '}
                    &#8593;{' '}
                  </ActionButton>
                  <ActionButton
                    style={{ marginLeft: '10px' }}
                    onClick={() => sortByParam('amount', 'DESC')}>
                    {' '}
                    &#8595;
                  </ActionButton>
                </ButtonsWrapper>
              </CellContainer>
            </HeaderCell>
            <HeaderCell>
              <CellContainer>
                <HeaderTitle>Kwota (EUR)</HeaderTitle>
                <ButtonsWrapper>
                  <ActionButton
                    onClick={() => sortByParam('euroAmount', 'ASC')}>
                    {' '}
                    &#8593;{' '}
                  </ActionButton>
                  <ActionButton
                    style={{ marginLeft: '10px' }}
                    onClick={() => sortByParam('euroAmount', 'DESC')}>
                    {' '}
                    &#8595;{' '}
                  </ActionButton>
                </ButtonsWrapper>
              </CellContainer>
            </HeaderCell>
            <HeaderCell>Opcje</HeaderCell>
          </HeaderRow>
          {expenses
            .filter(x => filterStatement(+x.amount, +filter.from, +filter.to))
            .map((expense: IExpense, index: number) => {
              return (
                <Row key={index} index={index}>
                  <TableCell>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                      <div>{expense.title}</div>
                      {expense.picture && (
                        <Popup
                          contentStyle={{ padding: 0, border: 'none' }}
                          trigger={<ActionButton> &#9673;</ActionButton>}
                          modal>
                          {close => (
                            <PopupModal
                              close={close}
                              content={<PictureModal url={expense.picture} />}
                              errors={errors}
                              title={expense.title}
                              saveText={'Zamknij'}
                            />
                          )}
                        </Popup>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell>{expense.euroAmount}</TableCell>
                  <TableCell>
                    {' '}
                    <Button
                      usage="remove"
                      onClick={() => deleteExpense(expense)}>
                      Usuń
                    </Button>{' '}
                    <Popup
                      trigger={<Button usage="edit">Edytuj</Button>}
                      closeOnDocumentClick={!errors.length}
                      contentStyle={{ padding: 0, border: 'none' }}
                      modal>
                      {close => (
                        <PopupModal
                          close={close}
                          errors={errors}
                          saveText={'Zapisz'}
                          content={
                            <EditItemModal
                              item={getInfoAboutRow(expense.title)}
                              updateRow={updateRow}
                              errors={errors}
                            />
                          }
                          title={'Edytuj'}
                        />
                      )}
                    </Popup>
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
