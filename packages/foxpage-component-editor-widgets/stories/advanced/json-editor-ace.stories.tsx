import React from 'react';
import { EditorProvider } from '../_helper';
import JSONEditorAce from '../../src/advanced/json-editor-ace';

export default {
  component: JSONEditorAce,
  title: 'advanced/json-editor-ace',
};

export const BaseUsage = () => {
  return (
    <EditorProvider
      props={{
        propKey: { test: 'test' },
      }}
    >
      <p>json-editor-ace:</p>
      <JSONEditorAce propKey="propKey" />
    </EditorProvider>
  );
};

export const HideVariablesBtn = () => {
  return (
    <EditorProvider
      props={{
        propKey: { test: '{{testVariable}}' },
      }}
    >
      <p>json-editor-ace:</p>
      <JSONEditorAce propKey="propKey" hideVariableBtn />
    </EditorProvider>
  );
};
