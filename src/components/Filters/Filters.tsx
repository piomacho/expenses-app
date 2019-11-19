import * as React from 'react';
import { IFilter } from '../../stores/expensesStore';
import { Input, InputsWrapper } from './Filters.style';
import { observer } from 'mobx-react';

// import { Sums } from './Summary.styles';

interface IFilterProps {
    filterByRange: (form: string, to: string) => void;
    filter: IFilter,
    addFilterContent:  (value: string, nameOfField: string) => void;
}

const Filter = observer(({filterByRange,
    addFilterContent,
    filter }: IFilterProps) => {
  return (
    <InputsWrapper>
        Zakres cen: 
          <Input
                value={filter.from}
                onChange={e => addFilterContent(e.target.value, 'from')}
              /> 
              <div>-</div>
          <Input
                value={filter.to}
                onChange={e => addFilterContent(e.target.value, 'to')}
              />

    </InputsWrapper>
  );
});

export default Filter;
