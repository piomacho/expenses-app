import styled from 'styled-components';
import * as styles from '../../common/colors';

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
  margin-bottom: 40px;
`;
export const Inputs = styled.div`
  width: 70%;
`;

export const Input = styled.input`
  width: 60%;
  margin-right: 20px;
  height: 25px;
`;

export const HeaderRow = styled.tr`
  background-color: ${styles.carbonGray};
  & > th {
    &:nth-child(1) {
      width: 40%;
    }
    &th:nth-child(2) {
      width: 25%;
    }
    &th:nth-child(3) {
      width: 25%;
    }
    &th:nth-child(4) {
      width: 10%;
    }
  }
`;

export const HeaderCell = styled.th`
  padding: 10px;
  text-align: left;
`;
export const TableCell = styled.td`
  padding: 10px;
`;

export const Header = styled.thead`
  &:nth-child(1) {
    width: 45%;
    background-color: 'red';
  }

  &th:nth-child(2) {
    width: 20%;
  }
  &th:nth-child(3) {
    width: 25%;
  }
  &th:nth-child(4) {
    width: 15%;
  }
`;

// export const LeftButton = styled(GlobalButton)`
//   border-right: none;
//   width: 100%;
//   border-radius: 4px 0 0 4px;
//   border-right: none;
//   max-width: 115px;
//   min-width: 100px;
//   padding: 12px;
//   cursor: pointer;
// `;

// export const RightButton = styled(GlobalButton)`
//   width: 100%;
//   border-radius: 0 4px 4px 0;
//   max-width: 115px;
//   min-width: 100px;
//   padding: 12px;
//   cursor: pointer;
//   background-color: ${colors.white};
// `;
