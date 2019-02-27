import * as React from 'react';

import { observer, inject } from 'mobx-react';
import { Button } from '../../common/globalStyles';
import {
  ConversionRateWrapper,
  CurrencyContainer,
  CurrencyInput
} from './ConversionRate.styles';

@inject('ExpensesStore')
@observer
class ConversionRate extends React.Component<any, any> {
  public handleSubmit = (e: any) => {
    const { addCurrentItem } = this.props;
    e.preventDefault();
    addCurrentItem();
  };
  // trim
  public handleChange = (e: any) => {
    this.props.ExpensesStore.euroValue = e.target.value;
  };

  public handleTo = () => {
    this.props.ExpensesStore.changeConversionRate();
  };
  render() {
    const { ExpensesStore, modifyConverionRate } = this.props;

    return (
      <ConversionRateWrapper>
        <Button onClick={this.handleTo}>
          {!ExpensesStore.editConversionRate ? 'Edit' : 'Apply'}
        </Button>
        <CurrencyContainer>
          {' '}
          1 EUR ={' '}
          {!ExpensesStore.editConversionRate ? (
            ExpensesStore.euroValue
          ) : (
            <CurrencyInput
              value={ExpensesStore.euroValue}
              onChange={this.handleChange}
            />
          )}{' '}
          PLN
        </CurrencyContainer>
      </ConversionRateWrapper>
    );
  }
}

export default ConversionRate;
