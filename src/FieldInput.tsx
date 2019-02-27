import * as React from 'react';

import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { FieldState } from 'formstate';

@observer
export class FieldInput extends React.Component<{
  fieldState: FieldState<any>;
  ref: string;
}> {
  render() {
    return (
      <input
        ref={this.props.ref}
        value={this.props.fieldState.value}
        onChange={e => this.props.fieldState.onChange(e.target.value)}
      />
    );
  }
}
