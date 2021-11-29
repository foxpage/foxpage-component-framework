import React from 'react';
import { Input } from 'antd';
import * as ObPathImmutable from 'object-path-immutable';
import { EditContext } from '@foxpage/foxpage-component-editor-context';
import VariableComp from '../../components/VariableComp/VariableComp';

class NumericInput extends React.Component {
  static contextType = EditContext;

  onChange = e => {
    const { propChange } = this.context;
    const { propKey, onChange } = this.props;

    const { value } = e.target;
    const reg = /^-?(0|[0-9][0-9]*)(\.[0-9]+)?$/;
    const isNumberFormat = reg.test(value);
    const isNumberChar = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/.test(value);
    if ((!Number.isNaN(value) && isNumberChar) || value === '' || value === '-') {
      const val = isNumberFormat ? Number(value) : value;
      if (propChange) {
        propChange(propKey, val);
      }

      if (onChange) {
        onChange(e);
      }
    }
  };

  onBlur = () => {
    const { onBlur, propKey } = this.props;
    const { componentProps, propChange, applyState } = this.context;

    const value = componentProps[propKey];

    const valstr = `${value}`;
    if (valstr.charAt(valstr.length - 1) === '.' || valstr === '-') {
      propChange(propKey, valstr);
    }
    if (onBlur) {
      onBlur();
    }
    if (applyState) {
      applyState();
    }
  };

  render() {
    const { componentProps } = this.context;
    const { propKey, placeholder, addonAfter, style, disableVariables, hideVariableBtn, inline } = this.props;
    const value = ObPathImmutable.get(componentProps, propKey, '');

    return (
      <VariableComp
        propKey={propKey}
        value={value}
        disable={disableVariables}
        hideVariableBtn={hideVariableBtn}
        disableFormat
        inline={inline}
        size="small"
      >
        <Input
          style={style}
          placeholder={placeholder}
          value={value}
          addonAfter={addonAfter}
          onChange={this.onChange}
          onBlur={this.onBlur}
          maxLength={25}
        />
      </VariableComp>
    );
  }
}

export default NumericInput;
