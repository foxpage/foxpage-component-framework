import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as ObPathImmutable from 'object-path-immutable';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { EditContext } from '@foxpage/foxpage-component-editor-context';
import VariableBtn from '../../components/VariableComp/VariableBtn';
import { isVariables } from '../../utils/variables';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/javascript/javascript';

const Wrapper = styled.div`
  & .CodeMirror {
    height: ${props => (props.height ? `${props.height}px` : 'auto')};
  }
`;

const OptionsBox = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  margin-bottom: 8px;
  & > & {
    margin-left： 8px;
  }
`;

/** @extends {React.Component<{propKey: string; height: number;> & Pick<CodeMirror['props']['options'], 'mode'>} */
class CodeArea extends React.Component {
  static contextType = EditContext;

  handleValueChange = value => {
    const { propChange } = this.context;
    const { propKey } = this.props;
    if (propChange && propKey) {
      propChange(propKey, value);
    }
  };

  onBlur = () => {
    const { applyState } = this.context;
    if (applyState) {
      applyState();
    }
  };

  render() {
    const { componentProps } = this.context;
    const { propKey, hideVariableBtn, mode, height } = this.props;
    const code = ObPathImmutable.get(componentProps, propKey, '');

    const content = (
      <Wrapper height={height}>
        <CodeMirror
          value={code}
          onBeforeChange={(editor, data, val) => {
            this.handleValueChange(val);
          }}
          onChange={() => {}}
          onBlur={this.onBlur}
          options={{
            lineNumbers: true,
            mode,
            lineWrapping: true,
            tabSize: 2,
          }}
        />
      </Wrapper>
    );
    if (hideVariableBtn) return content;
    const active = isVariables(code, { isMulti: true });
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

CodeArea.defaultProps = {
  mode: 'htmlmixed',
  propKey: '',
};

CodeArea.propTypes = {
  propKey: PropTypes.string.isRequired,
  mode: PropTypes.string,
};

export default CodeArea;
