import styled from 'styled-components';
import * as colors from '../../common/colors';

interface TableProps {
  index?: number;
  usage?: string;
}

export const Row = styled.tr<TableProps>`
  background-color: ${props =>
    props.index !== undefined && props.index % 2 === 0 ? colors.aliceBlue : colors.seaBlue};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid ${colors.carbonGray};
`;

export const HeaderTitle = styled.div``;

export const HeaderCellWrapper = styled.th`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderRow = styled.tr`
  background-color: ${colors.neutral};
  color: ${colors.carbonGray};
`;

export const HeaderCell = styled.th`
  padding: 10px;
  text-align: left;
  border: 1px solid ${colors.carbonGray};
`;
export const TableCell = styled.td`
  padding: 10px;
  border: 1px solid ${colors.carbonGray};
`;

export const Button = styled.button<TableProps>`
  border: 1px solid ${colors.carbonGray};
  border-radius: 4px;
  padding: 5px 10px;

  color: ${colors.carbonGray};
  outline-style: none;
  cursor: pointer;

  &:hover {
    color: ${colors.white};
    background-color:${props => props.usage === "remove" ? `rgba(222, 100, 100, 0.7)` : `rgba(230,185,0, 0.7)`};
  }
`;
