import React, { Component } from 'react';
import AceEditor from 'react-ace';
import styled from 'styled-components';
import * as ObPathImmutable from 'object-path-immutable';
import debounce from 'lodash/debounce';
import { EditContext } from '@foxpage/foxpage-component-editor-context';
import VariableBtn from '../../components/VariableComp/VariableBtn';
import { isVariables } from '../../utils/variables';

import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-terminal';
import 'ace-builds/src-noconflict/theme-solarized_light';

const OptionsBox = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  margin-bottom: 8px;
  & > & {
    margin-left： 8px;
  }
`;

class CodeEditor extends Component {
  static contextType = EditContext;

  handlePropChange = debounce(value => {
    const { propChange } = this.context;
    const { propKey, onChange } = this.props;
    propChange(propKey, value);
    if (onChange) {
      onChange(value);
    }
  }, 500);

  onBlur = () => {
    const { applyState } = this.context;
    if (applyState) {
      applyState();
    }
  };

  render() {
    const { componentProps } = this.context;
    const { propKey = '', hideVariableBtn, mode, theme, ...rest } = this.props;
    let { style } = this.props;
    style = { width: '100%', height: '200px', ...style };
    const value = ObPathImmutable.get(componentProps, propKey);

    const content = (
      <AceEditor
        mode={mode}
        theme={theme}
        onChange={this.handlePropChange}
        name={`${propKey}_UNIQUE_ID_OF_DIV`}
        style={style}
        value={value}
        onBlur={this.onBlur}
        {...rest}
      />
    );
    if (hideVariableBtn) return content;
    const active = isVariables(JSON.stringify(value), { isMulti: true });
    return (
      <div>
        <OptionsBox>
          <VariableBtn propKey={propKey} active={active} size="small" />
        </OptionsBox>
        {content}
      </div>
    );
  }
}

CodeEditor.defaultProps = {
  theme: 'github',
  mode: 'html',
};

export default CodeEditor;
