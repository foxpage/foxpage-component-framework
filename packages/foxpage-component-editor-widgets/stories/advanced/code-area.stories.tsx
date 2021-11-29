import React from 'react';
import { EditorProvider } from '../_helper';
import CodeArea from '../../src/advanced/code-area';

export default {
  component: CodeArea,
  title: 'advanced/code-area',
};

export const BaseUsage = () => {
  return (
    <EditorProvider
      props={{
        propKey: `test code`,
      }}
    >
      <p>code-area:</p>
      <CodeArea propKey="propKey" />
    </EditorProvider>
  );
};

export const HideVariablesBtn = () => {
  return (
    <EditorProvider
      props={{
        propKey: 'test code {{testVariable}}',
      }}
    >
      <p>code-area:</p>
      <CodeArea propKey="propKey" hideVariableBtn />
    </EditorProvider>
  );
};
