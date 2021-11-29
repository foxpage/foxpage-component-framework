import React, { Component } from 'react';
import AceEditor from 'react-ace';
import styled from 'styled-components';
import * as ObPathImmutable from 'object-path-immutable';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import { EditContext } from '@foxpage/foxpage-component-editor-context';

import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-terminal';
import 'ace-builds/src-noconflict/theme-solarized_light';

import VariableBtn from '../../components/VariableComp/VariableBtn';
import { isVariables } from '../../utils/variables';

const Option = {
  type: 'object',
};
const OptionsBox = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  margin-bottom: 8px;
  & > & {
    margin-left： 8px;
  }
`;
class JSONEditorAce extends Component {
  static contextType = EditContext;

  constructor(props, context) {
    super(props);
    const { componentProps } = context;
    const { propKey } = this.props;
    const objValue = ObPathImmutable.get(componentProps, propKey, {});
    this.state = {
      value: JSON.stringify(objValue, null, 4) || '{}',
    };
    this.handlePropChange = this.handlePropChange.bind(this);
    this.handlePropChange = debounce(this.handlePropChange, 500);
  }

  componentDidUpdate(prevProps, prevState) {
    const { componentProps } = this.context;
    const { propKey } = this.props;
    const { value } = this.state;
    if (typeof propKey === 'undefined') {
      return;
    }
    // 内部 state 改变不做双向数据同步处理 默认他数据处理是正确的
    if (this.state !== prevState) {
      return;
    }
    // else: 不是内部的 state 改变
    const objValue = ObPathImmutable.get(componentProps, propKey, {});
    try {
      const stateObjValue = JSON.parse(value);
      if (!isEqual(objValue, stateObjValue)) {
        this.setState({
          value: JSON.stringify(objValue, null, 4) || '{}',
        });
      }
    } catch (e) {
      console.warn('JSON parse error, input is not a json');
    }
  }

  handlePropChange(value) {
    const { propChange } = this.context;
    const { propKey } = this.props;
    try {
      value = JSON.parse(value);
      propChange(propKey, value);
    } catch (error) {
      console.warn('json editor ace, input json illegal!');
    }
  }

  onChange = value => {
    this.setState(
      {
        value,
      },
      () => {
        this.handlePropChange(value);
      },
    );
  };

  onBlur = () => {
    const { applyState } = this.context;
    if (applyState) {
      applyState();
    }
  };

  render() {
    const { value } = this.state;
    const { propKey = '', hideVariableBtn, theme } = this.props;
    let { style } = this.props;
    style = { width: '100%', height: '200px', ...style };
    const content = (
      <AceEditor
        mode="json"
        theme={theme}
        onChange={this.onChange}
        onBlur={this.onBlur}
        name={`${propKey}_UNIQUE_ID_OF_DIV`}
        style={style}
        value={value}
      />
    );

    if (hideVariableBtn) return content;
    const active = isVariables(JSON.stringify(value), { isMulti: true });
    return (
      <div>
        <OptionsBox>
          <VariableBtn propKey={propKey} active={active} option={Option} size="small" />
        </OptionsBox>
        {content}
      </div>
    );
  }
}

JSONEditorAce.propTypes = {
  theme: PropTypes.oneOf(['github', 'monokai', 'terminal', 'solarized_light']),
};

JSONEditorAce.defaultProps = {
  theme: 'solarized_light',
};

export default JSONEditorAce;
