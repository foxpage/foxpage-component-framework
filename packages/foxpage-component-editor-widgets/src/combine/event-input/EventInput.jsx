import React from 'react';
import { Input as AntdInput, Button } from 'antd';
import * as ObPathImmutable from 'object-path-immutable';
import cryptoRandomString from 'crypto-random-string';
import CopyText from 'copy-text-to-clipboard';
import { EditContext } from '@foxpage/foxpage-component-editor-context';

// convert blank string to undefined
function blankToUndefined(value) {
  return value === '' ? undefined : value;
}

class EventInput extends React.Component {
  static contextType = EditContext;

  constructor() {
    super();
    this.onCopyEvent.bind(this);
  }

  onChange = e => {
    const { propChange } = this.context;

    const { propKey, onChange, convert, blankIndicatesUndefined } = this.props;
    let { value } = e.target;
    if (propChange && propKey) {
      if (blankIndicatesUndefined) {
        // if input is blank string, convert to undefined
        value = blankToUndefined(value);
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
    const { onBlur, propKey, defaultValue, validate } = this.props;
    const { value } = e.target;

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

  onClickGenerate = () => {
    const { prefixStr = '' } = this.props;
    const value = cryptoRandomString({ length: 10 });
    this.onChange({
      target: {
        value: prefixStr + value,
      },
    });
  };

  onCopyEvent = value => {
    CopyText(value);
  };

  render() {
    const { componentProps } = this.context;

    const { defaultValue, type, validate, convert, blankIndicatesUndefined, prefixStr, propKey, ...rest } = this.props;

    if (typeof propKey === 'undefined') {
      return null;
    }
    const value = ObPathImmutable.get(componentProps, propKey, '');

    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        <AntdInput
          {...rest}
          value={value}
          onChange={this.onChange}
          onBlur={this.onBlur}
          style={{
            width: 'auto',
            minWidth: 300,
            margin: '0 12px 12px 0',
          }}
        />
        <div>
          <Button onClick={this.onClickGenerate} type="primary" style={{ marginRight: 8 }}>
            Generate Event
          </Button>
          <Button onClick={() => this.onCopyEvent(value)}>Copy Event</Button>
        </div>
      </div>
    );
  }
}

EventInput.defaultProps = {
  defaultValue: '',
  type: 'string',
  prefixStr: 'foxpage-emitter-',
  blankIndicatesUndefined: true,
  validate: () => {
    return true;
  },
  convert: value => value,
};

export default EventInput;
