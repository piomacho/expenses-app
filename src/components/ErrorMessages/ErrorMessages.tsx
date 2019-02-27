import * as React from 'react';
import { observer } from 'mobx-react';
import { AlertMessage, MessagesWrapper } from './ErrorMessages.styles';

export interface IErrorMessageProps {
  expenses: string[];
}

const ErrorMessages = observer(({ errors }: any) => {
  return (
    <MessagesWrapper>
      {errors &&
        errors.map((errorMsg: string, index: number) => (
          <AlertMessage key={index}> {errorMsg}</AlertMessage>
        ))}
    </MessagesWrapper>
  );
});

export default ErrorMessages;
