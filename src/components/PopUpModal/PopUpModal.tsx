import * as React from 'react';
import Popup from 'reactjs-popup';
import { Title, ErrorsWrapper, Button, SaveWrapper } from './PopUpModal.style';
import { ErrorMessages } from '../ErrorMessages';

interface IPopUpModal {
  close: () => void;
  content: JSX.Element;
  title: string;
  saveText: string;
  errors: string[];
}

const PopupModal = ({
  close,
  content,
  title,
  errors,
  saveText
}: IPopUpModal) => (
  <React.Fragment>
    <Title> {title} </Title>
    <React.Fragment>{content}</React.Fragment>
    <ErrorsWrapper>
      <ErrorMessages errors={errors} />
    </ErrorsWrapper>

    <SaveWrapper>
      {errors.length === 0 && (
        <Button
          className="button"
          onClick={() => {
            if (errors.length === 0) {
              close();
            }
          }}>
          <div>{saveText}</div>
        </Button>
      )}
    </SaveWrapper>
  </React.Fragment>
);

export default PopupModal;
