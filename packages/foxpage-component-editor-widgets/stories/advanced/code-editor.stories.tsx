import React from 'react';
import { EditorProvider } from '../_helper';
import CodeEditor from '../../src/advanced/code-editor';

export default {
  component: CodeEditor,
  title: 'advanced/code-editor',
};

export const BaseUsage = () => {
  return (
    <EditorProvider
      props={{
        propKey: `{ test: 'test' }`,
      }}
    >
      <p>code-editor:</p>
      <CodeEditor propKey="propKey" />
    </EditorProvider>
  );
};

export const HideVariablesBtn = () => {
  return (
    <EditorProvider
      props={{
        propKey: `{ test: '{{testVariable}}' }`,
      }}
    >
      <p>code-editor:</p>
      <CodeEditor propKey="propKey" hideVariableBtn />
    </EditorProvider>
  );
};
