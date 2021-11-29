import React from 'react';
import { EditorProvider } from '../_helper';
import JSONEditor from '../../src/advanced/json-editor';

export default {
  component: JSONEditor,
  title: 'advanced/json-editor',
};

export const BaseUsage = () => {
  return (
    <EditorProvider
      props={{
        propKey: { test: 'test' },
      }}
    >
      <p>json-editor:</p>
      <JSONEditor propKey="propKey" />
    </EditorProvider>
  );
};

export const HideVariablesBtn = () => {
  return (
    <EditorProvider
      props={{
        propKey: '{{testVariable}}',
      }}
    >
      <p>json-editor:</p>
      <JSONEditor propKey="propKey" hideVariableBtn />
    </EditorProvider>
  );
};
