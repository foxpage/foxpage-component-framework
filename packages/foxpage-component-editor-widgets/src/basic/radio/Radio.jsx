import React from 'react';
import { Radio as AntdRadio } from 'antd';
import * as ObPathImmutable from 'object-path-immutable';
import { EditContext } from '@foxpage/foxpage-component-editor-context';
import VariableComp from '../../components/VariableComp/VariableComp';

const { Button: AntdRadioButton, Group: AntdRadioGroup } = AntdRadio;

class Group extends React.Component {
  static contextType = EditContext;

  onChange = e => {
    const value = e.target.value;
    const { propChange, applyState } = this.context;
    const { propKey } = this.props;
    if (propChange && propKey) {
      propChange(propKey, value);
    }

    if (this.props.onChange) {
      this.props.onChange(value);
    }

    if (applyState) {
      applyState();
    }
  };

  render() {
    const { componentProps } = this.context;
    const { propKey, disableVariables, hideVariableBtn, children, width, style, ...rest } = this.props;

    if (typeof propKey === 'undefined') {
      return null;
    }

    const value = ObPathImmutable.get(componentProps, propKey);

    const mergedStyle = { width, ...style };

    return (
      <VariableComp
        propKey={propKey}
        value={value}
        disable={disableVariables}
        hideVariableBtn={hideVariableBtn}
        inline
        size="small"
      >
        <AntdRadioGroup {...rest} style={mergedStyle} value={value} onChange={this.onChange}>
          {children}
        </AntdRadioGroup>
      </VariableComp>
    );
  }
}
class Radio extends React.Component {
  render() {
    const { children, width, style, ...rest } = this.props;

    const mergedStyle = { width, ...style };

    return (
      <AntdRadio {...rest} style={mergedStyle}>
        {children}
      </AntdRadio>
    );
  }
}

Radio.Group = Group;
Radio.Button = AntdRadioButton;

Radio.Group.defaultProps = {
  width: '100%',
  disableVariables: false,
};

export default Radio;
