import React from 'react';
import { Checkbox as AntCheckbox } from 'antd';
import * as ObPathImmutable from 'object-path-immutable';
import PropTypes from 'prop-types';

import { EditContext } from '@foxpage/foxpage-component-editor-context';
import VariableComp from '../../components/VariableComp/VariableComp';

class Checkbox extends React.Component {
  static contextType = EditContext;

  onChange = e => {
    const { propChange, applyState } = this.context;
    const { propKey, onChange } = this.props;

    const { checked } = e.target;
    if (propChange) {
      propChange(propKey, checked);
    }
    if (onChange) {
      onChange(e);
    }
    if (applyState) {
      applyState();
    }
  };

  render() {
    const { componentProps } = this.context;

    const { label, style, propKey, disableVariables, hideVariableBtn, ...rest } = this.props;

    const checked = ObPathImmutable.get(componentProps, propKey, false);

    return (
      <VariableComp
        propKey={propKey}
        value={checked}
        disable={disableVariables}
        hideVariableBtn={hideVariableBtn}
        inline
        size="small"
      >
        <AntCheckbox {...rest} style={style} checked={checked} onChange={this.onChange}>
          {label}
        </AntCheckbox>
      </VariableComp>
    );
  }
}

Checkbox.propTypes = {
  label: PropTypes.string,
  propKey: PropTypes.string.isRequired,
  disableVariables: PropTypes.bool,
};

Checkbox.defaultProps = {
  label: 'CheckBox',
  disableVariables: false,
};

export default Checkbox;
