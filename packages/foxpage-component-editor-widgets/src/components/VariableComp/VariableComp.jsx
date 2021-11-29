import React from 'react';
import { isVariables } from '../../utils/variables';
import VariableBtn from './VariableBtn';

const VariableComp = props => {
  const {
    disable,
    hideVariableBtn,
    value,
    disableFormat,
    option,
    validVarOption = {},
    propKey,
    inline,
    size,
    children,
  } = props;
  const active = isVariables(value, validVarOption);
  if (disable) return children;
  const content = active && !disableFormat ? value : children;
  if (hideVariableBtn) return content;
  return (
    <div
      style={{
        display: inline ? 'inline-flex' : 'flex',
        alignItems: 'center',
      }}
    >
      {content}
      <VariableBtn propKey={propKey} active={active} option={option} size={size} />
    </div>
  );
};

export default VariableComp;
