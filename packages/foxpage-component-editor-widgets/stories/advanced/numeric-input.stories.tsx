import React from 'react';
import { EditorProvider } from '../_helper';
import NumericInput from '../../src/advanced/numeric-input';

export default {
  component: NumericInput,
  title: 'advanced/numeric-input',
};

export const BaseUsage = () => {
  return (
    <EditorProvider>
      <p>numericInput:</p>
      <NumericInput propKey="propKey" />
    </EditorProvider>
  );
};

export const DisableVariables = () => {
  return (
    <EditorProvider>
      <p>numericInput:</p>
      <NumericInput propKey="propKey" disableVariables />
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
      <p>numericInput:</p>
      <NumericInput propKey="propKey" hideVariableBtn />
    </EditorProvider>
  );
};

export const Inline = () => {
  return (
    <EditorProvider>
      <p>numericInput:</p>
      <NumericInput propKey="propKey" inline />
    </EditorProvider>
  );
};
