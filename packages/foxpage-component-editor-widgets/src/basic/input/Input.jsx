import React from 'react';
import { Input as AntdInput } from 'antd';
import * as ObPathImmutable from 'object-path-immutable';
import { EditContext } from '@foxpage/foxpage-component-editor-context';
import VariableComp from '../../components/VariableComp/VariableComp';

// convert blank string to undefined
function blankToUndefined(value) {
  return value === '' ? undefined : value;
}

// convert string to number if possible
function stringToNumber(value, force) {
  if (typeof value === 'string') {
    const isNumberFormat = /^-?(0|[0-9][0-9]*)(\.[0-9]+)?$/.test(value);
    if (!isNumberFormat) {
      return value;
    }

    // value is a number
    // dont convert when value is a float and ended by '0'
    if (value.indexOf('.') >= 0 && value[value.length - 1] === '0' && !force) {
      return value;
    }

    // convert to number
    const number = Number(value);
    if (!Number.isNaN(number)) {
      return number;
    }
  }
  return value;
}

class Input extends React.Component {
  static contextType = EditContext;

  onChange = e => {
    const { propChange } = this.context;

    const { propKey, onChange, convert, blankIndicatesUndefined, numberPreferred } = this.props;
    let { value } = e.target;
    if (propChange && propKey) {
      if (blankIndicatesUndefined) {
        // if input is blank string, convert to undefined
        value = blankToUndefined(value);
      }
      if (numberPreferred) {
        // convert to number if possible
        value = stringToNumber(value);
      }
      propChange(propKey, convert(value));
    }

    // invoke props onChange
    if (onChange) {
      onChange(e);
    }
  };

  onBlur = e => {
    const { propChange, applyState } = this.context;
    const { onBlur, propKey, defaultValue, validate, numberPreferred } = this.props;
    const { value } = e.target;

    if (numberPreferred) {
      if (propChange && propKey) {
        propChange(propKey, stringToNumber(value, true));
      }
    }

    // value invalid, set to defaultValue
    if (!validate(value)) {
      if (propChange && propKey) {
        propChange(propKey, defaultValue);
      }
    }

    // invoke props onBlur
    if (onBlur) {
      onBlur(e);
    }
    if (applyState) {
      applyState();
    }
  };

  render() {
    const { componentProps } = this.context;

    const {
      propKey,
      defaultValue,
      type,
      validate,
      convert,
      blankIndicatesUndefined,
      numberPreferred,
      disableVariables,
      hideVariableBtn,
      inline,
      ...rest
    } = this.props;

    if (typeof propKey === 'undefined') {
      return null;
    }

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
        <AntdInput {...rest} value={value} onChange={this.onChange} onBlur={this.onBlur} />
      </VariableComp>
    );
  }
}

Input.defaultProps = {
  defaultValue: '',
  type: 'string',
  blankIndicatesUndefined: true,
  numberPreferred: false,
  disableVariables: false,
  validate: () => {
    return true;
  },
  convert: value => value,
};

export default Input;
