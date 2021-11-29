import React from 'react';
import { Button as AntdButton } from 'antd';
import { EditContext } from '@foxpage/foxpage-component-editor-context';
import CurlyBraces from '../SvgComp/CurlyBraces';
import './index.css';

const SizeMap = {
  small: 16,
  default: 20,
};

class VariableBtn extends React.Component {
  static contextType = EditContext;

  onClick = () => {
    const { onBindVariable } = this.context;
    const { propKey, option } = this.props;
    onBindVariable(propKey, option);
  };

  render() {
    const { active, size, style = {} } = this.props;
    const iconSize = SizeMap[size] || SizeMap.default;
    const iconColor = active ? '#fff' : 'rgba(0, 0, 0, 0.6)';
    return (
      <AntdButton
        className="curly-braces-btn"
        type={active ? 'primary' : 'ghost'}
        size={size}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: size === 'small' ? '' : '0 4px',
          marginLeft: '8px',
          ...style,
        }}
        onClick={this.onClick}
        icon={<CurlyBraces size={iconSize} color={iconColor} pathClassName={active ? '' : 'highlight'} />}
      />
    );
  }
}

VariableBtn.defaultProps = {
  propKey: '',
  active: false,
};

export default VariableBtn;
