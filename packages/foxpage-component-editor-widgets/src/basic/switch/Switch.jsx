import React from 'react';
import { Switch as AntdSwitch } from 'antd';
import * as ObPathImmutable from 'object-path-immutable';
import { EditContext } from '@foxpage/foxpage-component-editor-context';
import VariableComp from '../../components/VariableComp/VariableComp';

class Switch extends React.Component {
  static contextType = EditContext;

  onChange = checked => {
    const { propChange, applyState } = this.context;
    const { propKey } = this.props;
    if (propChange && propKey) {
      propChange(propKey, checked);
    }

    if (this.props.onChange) {
      this.props.onChange(checked);
    }

    if (applyState) {
      applyState();
    }
  };

  render() {
    const { componentProps } = this.context;
    const { propKey, disableVariables, hideVariableBtn, style, ...rest } = this.props;

    if (typeof propKey === 'undefined') {
      return null;
    }

    const value = ObPathImmutable.get(componentProps, propKey, false);

    return (
      <VariableComp
        propKey={propKey}
        value={value}
        disable={disableVariables}
        hideVariableBtn={hideVariableBtn}
        inline
        size="small"
      >
        <AntdSwitch {...rest} style={style} checked={value} onChange={this.onChange} />
      </VariableComp>
    );
  }
}

export default Switch;
