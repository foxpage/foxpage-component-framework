import React from 'react';
import Input from '../../src/basic/input/Input';
import { EditorProvider } from '../_helper';

export default {
  component: Input,
  title: 'basic/input',
};

export const BaseUsage = () => {
  return (
    <EditorProvider>
      <p>input:</p>
      <Input propKey="propKey" />
    </EditorProvider>
  );
};

export const DisableVariables = () => {
  return (
    <EditorProvider>
      <p>input:</p>
      <Input propKey="propKey" disableVariables />
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
      <p>input:</p>
      <Input propKey="propKey" hideVariableBtn />
    </EditorProvider>
  );
};
