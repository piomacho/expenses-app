import * as React from 'react';
import { observer } from 'mobx-react';

import { Button } from '../../common/globalStyles';
import {
  ConversionRateWrapper,
  CurrencyContainer,
  CurrencyInput
} from './ConversionRate.styles';

export interface IFormProps {
  addCurrentExpense: () => void;
  euroValue: number;
  changeConversionRate: () => void;
  editConversionRate: boolean;
  setEuroValue: (value: string) => void;
}

@observer
class ConversionRate extends React.Component<IFormProps> {
  public handleSubmit = (e: React.FormEvent) => {
    const { addCurrentExpense } = this.props;

    e.preventDefault();
    addCurrentExpense();
  };

  public handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setEuroValue(e.target.value);
  };

  public handleButtonChange = () => {
    this.props.changeConversionRate();
  };
  render() {
    const { editConversionRate, euroValue } = this.props;

    return (
      <ConversionRateWrapper>
        <Button onClick={this.handleButtonChange}>
          {!editConversionRate ? 'Edit' : 'Apply'}
        </Button>
        <CurrencyContainer>
          {' '}
          1 EUR ={' '}
          {!editConversionRate ? (
            euroValue
          ) : (
            <CurrencyInput
              value={euroValue}
              onChange={this.handleInputChange}
            />
          )}{' '}
          PLN
        </CurrencyContainer>
      </ConversionRateWrapper>
    );
  }
}

export default ConversionRate;
