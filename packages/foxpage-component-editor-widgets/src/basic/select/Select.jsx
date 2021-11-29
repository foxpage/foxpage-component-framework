import React from 'react';
import { Select as AntdSelect } from 'antd';
import * as ObPathImmutable from 'object-path-immutable';
import { EditContext } from '@foxpage/foxpage-component-editor-context';
import VariableComp from '../../components/VariableComp/VariableComp';

const { Option: AntdOption } = AntdSelect;

class Select extends React.Component {
  static contextType = EditContext;

  onChange = value => {
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
        size="small"
      >
        <AntdSelect {...rest} style={mergedStyle} value={value} onChange={this.onChange}>
          {children}
        </AntdSelect>
      </VariableComp>
    );
  }
}

Select.Option = AntdOption;

Select.defaultProps = {
  width: '100%',
};

export default Select;
