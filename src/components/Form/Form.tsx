import * as React from 'react';
import { observer, inject } from 'mobx-react';

import {
  FieldWrapper,
  FormContainer,
  Inputs,
  ButtonWrapper,
  Input,
  Title
} from './Form.styles';
import { Button } from '../../common/globalStyles';
import { IExpense } from '../../stores/expensesStore';

export interface IFormProps {
  addCurrentExpense: () => void;
  currentExpense: IExpense;
  addFieldContent: (value: string, nameOfField: string) => void;
}
@inject('ExpensesStore')
@observer
class Form extends React.Component<IFormProps> {
  public handleSubmit = (e: React.FormEvent) => {
    const { addCurrentExpense } = this.props;

    e.preventDefault();
    addCurrentExpense();
  };

  render() {
    const { addFieldContent, currentExpense } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <FormContainer>
          <Inputs>
            <FieldWrapper>
              <Title>Tytuł</Title>
              <Input
                value={currentExpense.title}
                onChange={e => addFieldContent(e.target.value, 'title')}
              />
            </FieldWrapper>
            <FieldWrapper>
              <Title>Kwota (PLN)</Title>
              <Input
                value={currentExpense.amount}
                onChange={e => addFieldContent(e.target.value, 'amount')}
              />
            </FieldWrapper>
          </Inputs>
          <ButtonWrapper>
            <Button type="submit">Dodaj</Button>
          </ButtonWrapper>
        </FormContainer>
      </form>
    );
  }
}

export default Form;
