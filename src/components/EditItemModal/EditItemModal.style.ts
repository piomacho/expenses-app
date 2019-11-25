import styled from 'styled-components';

interface EditItemModalProps {
  index?: number;
  usage?: string;
}

export const Input = styled.input`
  width: 60%;
  height: 25px;
  margin-bottom: 25px;
`;

export const FieldWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  height: 40px;
`;

export const Title = styled.div`
  font-weight: 700;
  margin-bottom: 30px;
`;

export const TitleWrapper = styled.div`
  color: ;
`;

export const ModalContainer = styled.div`
  display: flex;
  padding: 40px 40px 20px 40px;
`;

export const InputsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;
