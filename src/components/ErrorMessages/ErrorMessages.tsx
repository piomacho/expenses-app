import * as React from 'react';
import { observer } from 'mobx-react';
import { AlertMessage, MessagesWrapper } from './ErrorMessages.styles';

export interface IErrorMessageProps {
  errors: string[];
}

const ErrorMessages = observer(({ errors }: IErrorMessageProps) => {
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
