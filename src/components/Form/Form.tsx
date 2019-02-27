import * as React from 'react';

import { observer, inject } from 'mobx-react';
import {
  FieldWrapper,
  FormContainer,
  Inputs,
  ButtonWrapper,
  Input
} from './Form.styles';
import { Button } from '../../common/globalStyles';

// @inject('ExpensesStore')
@observer
class Form extends React.Component<any, any> {
  public handleSubmit = (e: any) => {
    const { addCurrentItem } = this.props;
    e.preventDefault();
    addCurrentItem();
  };

  render() {
    const { addFieldContent, currentItem } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <FormContainer>
          <Inputs>
            <FieldWrapper>
              <div>Title of transaction</div>
              <Input
                value={currentItem.title}
                onChange={e => addFieldContent(e.target.value, 'title')}
              />
            </FieldWrapper>
            <FieldWrapper>
              <div>Amount (in PLN)</div>
              <Input
                value={currentItem.amount}
                onChange={e => addFieldContent(e.target.value, 'amount')}
              />
            </FieldWrapper>
          </Inputs>
          <ButtonWrapper>
            <Button type="submit">Add</Button>
          </ButtonWrapper>
        </FormContainer>
      </form>
    );
  }
}

export default Form;
