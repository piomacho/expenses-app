import styled from 'styled-components';
import * as colors from '../../common/colors';

export const FieldWrapper = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ButtonWrapper = styled.div`
  width: 30%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;
export const FormContainer = styled.div`
  display: flex;
  height: 100px;
  margin-bottom: 70px;
`;
export const Inputs = styled.div`
  width: 70%;
`;

export const Title = styled.div`
  font-weight: 700;
`;

export const Input = styled.input`
  width: 60%;
  margin-right: 20px;
  height: 25px;
`;

export const HeaderRow = styled.tr`
  background-color: ${colors.carbonGray};
`;

export const HeaderCell = styled.th`
  padding: 10px;
  text-align: left;
`;
export const TableCell = styled.td`
  padding: 10px;
`;
