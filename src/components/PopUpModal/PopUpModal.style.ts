import styled from 'styled-components';
import * as colors from '../../common/colors';

interface EditItemModalProps {
  index?: number;
  usage?: string;
}

export const ErrorsWrapper = styled.div`
  padding-left: 20px;
`;

export const Title = styled.div`
  color: ${colors.white};
  background-color: ${colors.black};
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-size: 30px;
  font-weight: 300;
`;

export const Button = styled.button`
  border: 2px solid ${colors.carbonGray};
  border-radius: 30px;
  padding: 8px 20px;
  cursor: pointer;
  &:hover {
    border-color: ${colors.black};
  }
`;

export const SaveWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;
