import * as React from 'react';
import {
  Input,
  FieldWrapper,
  Title,
  TitleWrapper,
  ModalContainer,
  InputsWrapper
} from './EditItemModal.style';
import { IExpense } from '../../stores/inteface';
import { ErrorMessages } from '../ErrorMessages';

interface IEditItemModal {
  item: IExpense;
  updateRow: (title: string, value: string, nameOfField: string) => void;
  errors: string[];
  //   content: JSX.Element;
}

const EditItemModal = ({ item, updateRow, errors }: IEditItemModal) => (
  <ModalContainer>
    {/* <FormContainer> */}
    {/* <Inputs> */}
    <TitleWrapper>
      <Title>Nazwa</Title>
      <Title>Kwota (PLN)</Title>
      {item.picture && <Title>Zdjęcie</Title>}
    </TitleWrapper>

    <InputsWrapper>
      <Input
        value={item.title}
        onChange={e => updateRow(item.title, e.target.value, 'title')}
      />
      <Input
        value={item.amount}
        onChange={e => updateRow(item.title, e.target.value, 'amount')}
      />
      {item.picture && (
        <Input
          value={item.picture}
          onChange={e => updateRow(item.title, e.target.value, 'picture')}
        />
      )}
    </InputsWrapper>

    {/* </Inputs> */}
    {/* </FormContainer> */}
  </ModalContainer>
);

export default EditItemModal;
