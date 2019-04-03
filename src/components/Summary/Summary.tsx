import * as React from 'react';

import { Sums } from './Summary.styles';

interface SummaryProps {
  sumInPLN: number;
  sumInEURO: number;
}

const Summary: React.FunctionComponent<SummaryProps> = ({
  sumInPLN,
  sumInEURO
}) => {
  return (
    <Sums>
      Suma: {sumInPLN} PLN ({sumInEURO.toFixed(2)} EUR)
    </Sums>
  );
};

export default Summary;
