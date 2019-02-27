import styled from 'styled-components';
import * as styles from '../../common/constants';
import { ITableProps } from './Table';

interface TableProps {
  index: number;
}

export const Row = styled.tr<TableProps>`
  background-color: ${props =>
    props.index % 2 === 0 ? styles.elephantGray : styles.seaBlue};
`;

export const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  border: 2px solid #ddd;
`;

export const HeaderRow = styled.tr`
  background-color: ${styles.elephantGray};
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

export const Button = styled.button`
  border: 1px solid ${styles.elephantGray};
  border-radius: 4px;
  padding: 5px 10px;

  color: ${styles.seaBlue};
  outline-style: none;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: rgba(222, 100, 100, 0.5);
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
