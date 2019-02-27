import styled from 'styled-components';
import * as colors from './';

export const Button = styled.button`
  border: 1px solid ${colors.carbonGray};
  border-radius: 4px;
  padding: 10px 50px;

  color: ${colors.carbonGray};
  outline-style: none;
  cursor: pointer;

  &:hover {
    color: ${colors.white};
    background-color: ${colors.seaBlue};
  }
`;
